import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  options: AnimationOptions = {
    path: 'https://sompalsingh.github.io/api/data/check.json',
    renderer: 'svg',
    loop: false,
    autoplay: false
  }
  // options.AnimationItem={
  //   speed:1,
  //   direction:-1
  // }
  eventCheck(event){
    if(event.target.checked){
      this.playAnimation();
    }else{
      this.reverceAnimation();
    }
  } 

  playAnimation(): void {
    this.options = {
      ...this.options,
      autoplay: true,
      path: 'https://sompalsingh.github.io/api/data/check.json',
    };
    
    this.playFile('https://sompalsingh.github.io/api/mp3/hello.mp3')
  }
  reverceAnimation(): void {
    this.options = {
      ...this.options,
      autoplay: true,
      path: 'https://sompalsingh.github.io/api/data.json'
    };
    this.playFile('https://sompalsingh.github.io/api/mp3/bye.mp3')
  }
  
  playFile(filepath) {
    // see https://jakearchibald.com/2016/sounds-fun/
    const context = new window.AudioContext();
    fetch(filepath)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        const soundSource = context.createBufferSource();
        soundSource.buffer = audioBuffer;
        soundSource.connect(context.destination);
        soundSource.start();
      });
    }
  
  constructor() {}
  ngOnInit(): void {}
}
