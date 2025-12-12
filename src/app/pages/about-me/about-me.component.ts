import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent {
  name = 'عبدالله';
  company = 'AS Real Estate';
  location = 'إسطنبول، تركيا';
  experienceYears = 3;

  headline = 'خبير عقارات في إسطنبول';
  bio =
    'عبدالله يعمل في شركة AS Real Estate ولديه خبرة تزيد عن 3 سنوات في سوق العقارات داخل إسطنبول. متخصص في البيع والإيجار، خصوصًا الشقق السياحية (إيجار قصير المدى) والإيجار السنوي (طويل المدى)، ويهتم بتقديم تجربة واضحة وسلسة للعميل من أول تواصل حتى توقيع العقد.';

  servicesTitle = 'الخدمات';
  services: string[] = [
    'بيع وشراء العقارات',
    'تأجير شقق سياحية (قصير المدى)',
    'تأجير سنوي (طويل المدى)',
    'مساعدة العميل في اختيار العقار المناسب',
  ];

  personPhotoUrl = 'assets/abdullah.jpg';   // صورة عبدالله
  companyLogoUrl = 'assets/as-logo.png';    // لوجو الشركة
}
