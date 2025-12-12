import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService, Property } from '../../services/firebase.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  propertyForm: FormGroup;
  imageData: string | null = null;  // ممكن نسيبها بس مش هنستخدمها
imagesData: string[] = [];
 // <-- هنا هنخزن Base64
  isSubmitting = false;
  message = '';
 properties: Property[] = [];
  isLoadingList = false;
  listError = '';
  deletingId: string | null = null;
  categories = [
    { value: 'tourist-apartments', label: 'شقق سياحية' },
    { value: 'yearly-rent', label: 'شقق إيجار سنوي' },
    { value: 'for-sale', label: 'شقق للبيع' },
    { value: 'investment-projects', label: 'مشاريع استثمارية' },
    { value: 'cabins-villas', label: 'أكواخ وفيلات' },
  ];

  areas = [
    { value: 'zone1', label: 'منطقة 1' },
    { value: 'zone2', label: 'منطقة 2' },
  ];

  roomOptions = [1, 2, 3, 4];

    constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private location: Location
  ) {
    this.propertyForm = this.fb.group({
      category: ['tourist-apartments', Validators.required],
      areaId: ['zone1', Validators.required],
      rooms: [1, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPropertiesList();
  }

  async loadPropertiesList(): Promise<void> {
    this.isLoadingList = true;
    this.listError = '';
    try {
      this.properties = await this.firebaseService.getAllProperties();
    } catch (err) {
      console.error(err);
      this.listError = 'حدث خطأ أثناء تحميل قائمة الوحدات.';
    } finally {
      this.isLoadingList = false;
    }
  }

onFileSelected(event: any) {
  const files: FileList = event.target.files;

  if (!files || files.length === 0) {
    return;
  }

  // 👇 مابنصفرش imagesData، بنكمّله عليها
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.imagesData.push(base64);
    };

    reader.readAsDataURL(file);
  }

  // optional: تفضي قيمة الـ input عشان تقدر تختار نفس الملف تاني لو حابب
  event.target.value = '';
}

goBack() {
  this.location.back();
}


  async onSubmit() {
    this.message = '';

   if (this.propertyForm.invalid || this.imagesData.length === 0) {
  this.message = 'من فضلك املأ كل الحقول واختر صورة واحدة على الأقل.';
  return;
}

this.isSubmitting = true;

try {
  const formValue = this.propertyForm.value;

  await this.firebaseService.addProperty({
    category: formValue.category,
    areaId: formValue.areaId,
    rooms: Number(formValue.rooms),
    title: formValue.title,
    description: formValue.description,
    imagesBase64: this.imagesData,  // 👈 أهم سطر
  });

  this.message = 'تم إضافة الوحدة بنجاح ✅';

  this.propertyForm.reset({
    category: 'tourist-apartments',
    areaId: 'zone1',
    rooms: 1,
  });
  this.imageData = null;
  this.imagesData = [];

  await this.loadPropertiesList();
} catch (err) {
  console.error(err);
  this.message = 'حدث خطأ أثناء حفظ بيانات الوحدة.';
} finally {
  this.isSubmitting = false;
}
  }
    get isTouristSelected(): boolean {
    return this.propertyForm.get('category')?.value === 'tourist-apartments';
  }
async onDeleteProperty(prop: Property) {
  // لو مفيش id من الأساس نطلع بره
  if (!prop.id) return;

  const ok = confirm(
    `هل أنت متأكد أنك تريد حذف الوحدة: "${prop.title}"؟`
  );
  if (!ok) return;

  this.deletingId = prop.id;

  try {
    // استدعاء السيرفس لحذف الدوكيومنت من Firestore
    await this.firebaseService.deleteProperty(prop.id);

    // شيلها من الـ array في الواجهة
    this.properties = this.properties.filter((p) => p.id !== prop.id);

    this.message = 'تم حذف الوحدة بنجاح 🗑️';
  } catch (err) {
    console.error(err);
    this.message = 'حدث خطأ أثناء حذف الوحدة.';
  } finally {
    this.deletingId = null;
  }
}

}
