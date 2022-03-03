import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {

  title = "Chọn ngôn ngữ của bạn\nChoose your language\n选择你的语言"
  _userInfo: Object;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
  }

  selectLang(lang : string){
    try{
      this.translateService.setDefaultLang(lang);
      this.router.navigate(['/auth/pin'])
    } catch (err){
      this.translateService.setDefaultLang('vi');
    }
  }

}
