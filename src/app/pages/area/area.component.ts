import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService, Property } from '../../services/firebase.service';
import { Location } from '@angular/common';

type CategoryType =
  | 'tourist-apartments'
  | 'yearly-rent'
  | 'for-sale'
  | 'investment-projects'
  | 'cabins-villas';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
})
export class AreaComponent implements OnInit {
  type!: CategoryType;
  areaId!: string;

  typeLabel = '';
  areaLabel = '';
  isTourist = false;

  roomFilters = [1, 2, 3, 4];
  selectedRooms: number | null = null;

  properties: Property[] = [];
  isLoading = false;
  loadError = '';

  private waNumber = '905076751611';

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.type = params.get('type') as CategoryType;
      this.areaId = params.get('area') ?? '';

      this.isTourist = this.type === 'tourist-apartments';
      this.selectedRooms = null;

      this.setupLabels();
      this.loadPropertiesFromFirebase();
    });
  }

  async loadPropertiesFromFirebase() {
    this.isLoading = true;
    this.loadError = '';
    this.properties = [];

    try {
      const data = await this.firebaseService.getPropertiesByCategoryAndArea(
        this.type,
        this.areaId
      );
      this.properties = data;
    } catch (err) {
      console.error(err);
      this.loadError = 'حدث خطأ أثناء تحميل الوحدات من الخادم.';
    } finally {
      this.isLoading = false;
    }
  }

  setupLabels() {
    const typeLabels: Record<CategoryType, string> = {
      'tourist-apartments': 'شقق سياحية',
      'yearly-rent': 'شقق إيجار سنوي',
      'for-sale': 'شقق للبيع',
      'investment-projects': 'مشاريع استثمارية',
      'cabins-villas': 'أكواخ وفيلات',
    };

    this.typeLabel = typeLabels[this.type];

    if (this.areaId === 'zone1') this.areaLabel = 'منطقة 1';
    else if (this.areaId === 'zone2') this.areaLabel = 'منطقة 2';
    else this.areaLabel = 'منطقة غير معروفة';
  }

  selectRooms(rooms: number | null) {
    if (rooms === null) this.selectedRooms = null;
    else this.selectedRooms = this.selectedRooms === rooms ? null : rooms;
  }

  get filteredProperties(): Property[] {
    return this.properties.filter((p) => {
      if (this.selectedRooms === null) return true;
      return Number(p.rooms) === this.selectedRooms;
    });
  }

  goBack() {
    this.location.back();
  }

  openWhatsApp(event: MouseEvent, prop: Property) {
    event.preventDefault();
    event.stopPropagation();

    if (!prop?.id) return;

    const propertyUrl = `${window.location.origin}/property/${prop.id}`;

    const text =
      `السلام عليكم، أنا مهتم بالشقة دي:\n` +
      `- النوع: ${this.typeLabel}\n` +
      `- المنطقة: ${this.areaLabel}\n` +
      `- العنوان: ${prop.title}\n` +
      `- عدد الغرف: ${prop.rooms} غرفة + صالة\n` +
      `الرابط: ${propertyUrl}`;

    const waLink = `https://wa.me/${this.waNumber}?text=${encodeURIComponent(text)}`;
    window.open(waLink, '_blank');
  }
}
