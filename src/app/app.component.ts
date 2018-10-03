import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private deviceScreenHeight = window.innerHeight;
  public contentMode = 'minimize'; 
  public option: string = 'catalog';    

  // tab data structures
  public catalog_resources = [1];
  public homework_resources = [1,2];
  public clicker_resources = [1,2,3];
  public media_resources = [1,2,3,4,5,6,7,8,9,10];
  public selected_resources = [];

  constructor() {}

  ngAfterViewInit() {
    this.tabSelection('catalog');

    let contentWindow = $('#middle');
    var minMax = ()=> {
      this.deviceScreenHeight = window.innerHeight;
      $('#top-content').slideToggle('slow');
      $('#bottom-content').slideToggle('slow');

      if (this.contentMode != 'maximize') {
        $('#top').animate({top: '0px'}, 'slow');
        let minContentHeight = this.deviceScreenHeight - 360;
        contentWindow.css('height', minContentHeight + 'px');
        $('#bottom').animate({bottom: '180px'}, 'slow');
        $(this).removeClass('show').addClass('hide');
        this.contentMode = "maximize";
      } else {
        $('#top').animate({top: '0px'}, 'slow');
        contentWindow.css('height', this.deviceScreenHeight + 'px');
        $('#bottom').animate({bottom: '0px'}, 'slow');
        $(this).removeClass('hide').addClass('show');
        this.contentMode = "minimize";
      }  
    };

    $('#min_max_btn_container').click(minMax);
    $('#min_max_btn_container').trigger('click');

    $(window).on('resize', () => {
      this.deviceScreenHeight = window.innerHeight;
      if (this.contentMode != 'maximize') {
        contentWindow.css('height', this.deviceScreenHeight + 'px');
      } else {
        let minContentHeight = this.deviceScreenHeight - 360;
        contentWindow.css('height', minContentHeight + 'px');
      }  
    });
  }

  // tab functionality 
  tabSelection(type: string) {
    switch (type) {
      case 'catalog':
        this.option = 'catalog';
        this.selected_resources = this.catalog_resources;
        break;
      case 'homework':
        this.option = 'homework';
        this.selected_resources = this.homework_resources;
        break;
      case 'clicker': 
        this.option = 'clicker';
        this.selected_resources = this.clicker_resources;
        break;
      case 'media':
        this.option = 'media';
        this.selected_resources = this.media_resources;
        break;
    }
  }

  // delete functionality 
  removeResource(index: number) {
    this.selected_resources.splice(index, 1); // removes the resource at index index
  }
}
