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
   ' مستشار عقاري ومؤسس AS Real Estate في إسطنبول، متخصص في تسويق وبيع الشقق السكنية والاستثمارية، مع تقديم استشارات عقارية مبنية على خبرة وثقة لمساعدة العملاء على اختيار أفضل الفرص',
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
