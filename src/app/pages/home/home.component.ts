import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


interface Category {
  title: string;
  subtitle: string;
  route: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  about = {
  name: 'عبدالله',
  company: 'AS Real Estate',
  location: 'إسطنبول، تركيا',
  experienceYears: 3,
  headline: 'بيع وإيجار شقق سياحية وإيجار سنوي في إسطنبول',
  bio:
    'عبدالله يعمل في شركة AS Real Estate ولديه خبرة أكثر من 3 سنوات في سوق العقارات بإسطنبول. يساعد العملاء في اختيار الشقة المناسبة والتعامل بكل وضوح وسهولة من أول تواصل حتى توقيع العقد.',
  photoUrl: 'assets/pp.jpeg',

};

  categories: Category[] = [
    {
      title: 'شقق سياحية',
      subtitle: 'وحدات جاهزة للإيجار اليومي أو الأسبوعي في أفضل المناطق السياحية.',
      route: '/category/tourist-apartments',
    },
    {
      title: 'شقق إيجار سنوي',
      subtitle: 'وحدات سكنية بعقود طويلة تناسب العائلات والاستقرار.',
      route: '/category/yearly-rent',
    },
    {
      title: 'شقق للبيع',
      subtitle: 'وحدات تملك كاملة مع خيارات مختلفة في المساحات والأسعار.',
      route: '/category/for-sale',
    },
    {
      title: 'مشاريع استثمارية',
      subtitle: 'مشاريع مميزة للاستثمار العقاري بعوائد مناسبة.',
      route: '/category/investment-projects',
    },
    {
      title: 'أكواخ وفيلات',
      subtitle: 'وحدات خاصة بأجواء هادئة ومساحات واسعة.',
      route: '/category/cabins-villas',
    },
  ];

  constructor(private router: Router,
    private location: Location
  ) {}

  goToCategory(route: string) {
    this.router.navigateByUrl(route);
  }
  goBack() {
  this.location.back();
}
}
