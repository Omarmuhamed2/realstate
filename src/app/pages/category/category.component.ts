import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService, Property } from '../../services/firebase.service';
import { Location } from '@angular/common';

type CategoryType =
  | 'tourist-apartments'
  | 'yearly-rent'
  | 'for-sale'
  | 'investment-projects'
  | 'cabins-villas';

interface Area {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  type!: CategoryType;
  typeLabel = '';
  areas: Area[] = [];

  isTourist = false;
  properties: Property[] = [];
  isLoading = false;
  loadError = '';

  private waNumber = '905076751611';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      this.type = params.get('type') as CategoryType;
      this.isTourist = this.type === 'tourist-apartments';

      this.setupCategory();

      if (!this.isTourist) {
        await this.loadCategoryProperties();
      }
    });
  }

  setupCategory() {
    const labels: Record<CategoryType, string> = {
      'tourist-apartments': 'شقق سياحية',
      'yearly-rent': 'شقق إيجار سنوي',
      'for-sale': 'شقق للبيع',
      'investment-projects': 'مشاريع استثمارية',
      'cabins-villas': 'أكواخ وفيلات',
    };

    this.typeLabel = labels[this.type];

    if (this.isTourist) {
      this.areas = [
        {
          id: 'zone1',
          name: 'منطقة شيشلي',
          description: 'وحدات قريبة من البحر والخدمات السياحية.',
        },
        {
          id: 'zone2',
          name: 'منطقة الفاتح',
          description: 'شقق بإطلالة مميزة وموقع هادئ.',
        },
      ];
    } else {
      this.areas = [];
    }
  }

  async loadCategoryProperties() {
    this.isLoading = true;
    this.loadError = '';
    this.properties = [];

    try {
      this.properties = await this.firebaseService.getPropertiesByCategory(this.type);
    } catch (err) {
      console.error(err);
      this.loadError = 'حدث خطأ أثناء تحميل الوحدات.';
    } finally {
      this.isLoading = false;
    }
  }

  openArea(area: Area) {
    this.router.navigate(['/category', this.type, area.id]);
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
      `السلام عليكم، أنا مهتم بالوحدة دي:\n` +
      `- النوع: ${this.typeLabel}\n` +
      `- العنوان: ${prop.title}\n` +
      `- عدد الغرف: ${prop.rooms} غرفة + صالة\n` +
      `الرابط: ${propertyUrl}`;

    const waLink = `https://wa.me/${this.waNumber}?text=${encodeURIComponent(text)}`;
    window.open(waLink, '_blank');
  }
}
