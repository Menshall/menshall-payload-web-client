"use client";
import * as React from "react";
import classNames from "classnames";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import { NextButton, PrevButton, usePrevNextButtons } from "./Navigation";

import styles from "./styles.module.scss";

type PropType = {
  slides: any;
  title: string | React.ReactNode;
  className?: string;
  viewportClassName?: string;
  slideClassName?: string;
  options?: EmblaOptionsType;
  slide: (props: any) => React.ReactNode;
  keyValue?: string;
  buttonText?: string;
};

const EmblaCarousel = (props: PropType) => {
  const {
    slides,
    title,
    className,
    slideClassName,
    viewportClassName,
    options,
    slide: Slide,
    buttonText,
  } = props;

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const memoSlides: Array<() => void> = React.useMemo(
    () => slides,
    [slides.length],
  );

  const id = React.useId();

  return (
    <div className={classNames(styles.embla, className, "grid-content")}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <div className={styles.navigation}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      <div
        className={classNames(styles.embla__viewport, viewportClassName)}
        ref={emblaRef}
      >
        <div className={styles.embla__container}>
          {memoSlides.map((slide, index) => (
            <div
              className={classNames(styles.embla__slide, slideClassName)}
              key={`${id}=${index}`}
            >
              <Slide {...slide} buttonText={buttonText} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
