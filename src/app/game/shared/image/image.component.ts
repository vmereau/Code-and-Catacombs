import {ChangeDetectionStrategy, Component, Input, signal, Signal} from '@angular/core';
import {LoaderComponent} from '../loader/loader.component';
export enum ImageSizes {
  Medium = "medium",
  Small = "small",
  Large = "large",
  Full = "full",
}

@Component({
  selector: 'app-image',
  imports: [
    LoaderComponent
  ],
  templateUrl: './image.component.html',
  standalone: true,
  styleUrl: './image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
  @Input() public img: Signal<any | undefined> = signal(undefined);
  @Input() public isImgLoading: Signal<boolean> =  signal(false);
  @Input() public isImgError: Signal<unknown> =  signal(false);

  @Input() public imgSize: ImageSizes = ImageSizes.Large;
}
