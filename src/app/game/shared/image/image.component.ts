import {ChangeDetectionStrategy, Component, Input, signal, Signal} from '@angular/core';
export enum ImageSizes {
  Default = "default"
}

@Component({
  selector: 'app-image',
  imports: [],
  templateUrl: './image.component.html',
  standalone: true,
  styleUrl: './image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
  @Input() public img: Signal<any | undefined> = signal(undefined);
  @Input() public isImgLoading: Signal<boolean> =  signal(false);
  @Input() public isImgError: Signal<unknown> =  signal(false);

  @Input() public imgSize: ImageSizes = ImageSizes.Default;
}
