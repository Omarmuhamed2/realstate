import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService, Property } from '../../services/firebase.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
})
export class PropertyDetailComponent implements OnInit {

  property: Property | null = null;   // 👈 بقت تقدر تكون null
  activeIndex = 0;
  zoomImage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private firebase: FirebaseService,
    private location: Location
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const all = await this.firebase.getAllProperties();
    const found = all.find((p) => p.id === id) || null;

    if (!found) {
      return; // ممكن تحط رسالة "الوحدة غير موجودة"
    }

    // نضمن إن عندنا Array من الصور مهما حصل
    const images: string[] =
      found.imagesBase64 && found.imagesBase64.length > 0
        ? found.imagesBase64
        : found.imageBase64
        ? [found.imageBase64]
        : [];

    this.property = {
      ...found,
      imagesBase64: images,
      imageBase64: images[0] ?? found.imageBase64,
    };

    // أمان: لو مفيش ولا صورة، نخلي activeIndex = 0 وبس
    this.activeIndex = 0;
  }

  // Getter يرجع الصور كـ array جاهزة للـ template
  get images(): string[] {
    return this.property?.imagesBase64 ?? [];
  }

  openImage(img?: string | null) {
    if (!img) return; // لو undefined أو null ما نعملش حاجة
    this.zoomImage = img;
  }

  closeZoom() {
    this.zoomImage = null;
  }
   goBack() {
  this.location.back();
}
}
