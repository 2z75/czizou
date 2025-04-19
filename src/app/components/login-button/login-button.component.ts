import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements AfterViewInit {
  @Output() clicked = new EventEmitter<void>();

  ngAfterViewInit(): void {
    const glowLines = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    glowLines.to('#glow-line', {
      left: '200%',
      opacity: 1,
      duration: 1.5,
      ease: 'power2.inOut'
    }).to('#glow-line', { opacity: 0, duration: 0.2 }, '-=0.3');

    glowLines.to('#glow-line-2', {
      left: '200%',
      opacity: 1,
      duration: 1.5,
      ease: 'power2.inOut'
    }, '-=1.8').to('#glow-line-2', { opacity: 0, duration: 0.2 }, '-=0.3');
  }

  triggerClick(): void {
    this.clicked.emit();
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.clicked.emit();
    }
  }
}
