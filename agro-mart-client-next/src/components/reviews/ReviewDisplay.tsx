"use client";
import React, { useContext, useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "@/styles/reviewStyle.css";
import { ThemeContext } from "@/providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import Loading from "@/components/ui/Loading";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function Arrow(props: { disabled: boolean; left?: boolean; onClick: (e: React.MouseEvent) => void }) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg onClick={props.onClick} className={`arrow ${props.left ? "arrow--left" : "arrow--right"} ${disabled}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      {props.left && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
      {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  );
}

const ReviewDisplay = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) { setCurrentSlide(slider.track.details.rel); },
    created() { setLoaded(true); },
  });

  useEffect(() => {
    fetch(`${API_URL}/reviews`)
      .then((res) => res.json())
      .then((data) => { setReviews(data); setIsLoading(false); })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="pt-20">
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h5 className={`${theme === "dark" ? "text-green-600" : "text-green-700"}`}>{t("testimonials.title")}</h5>
          <h3 className="text-5xl font-bold font-syne max-w-3xl py-4">{t("testimonials.subTitle")}</h3>
        </div>
      </div>
      <div className="pb-20" style={theme === "light" ? { backgroundImage: `url('https://i.ibb.co.com/1JsMjXv0/bg-1.png')`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" } : {}}>
        <div className="navigation-wrapper max-w-4xl mx-auto">
          <div ref={sliderRef} className="keen-slider">
            {reviews.map((r: any, i: number) => (
              <div key={i} className="keen-slider__slide number-slide2 flex-col">
                <p className="w-3/4 text-center">{r.message}</p>
                <div className={`${theme === "dark" ? "text-green-600" : "text-green-700"} my-7 text-center`}>
                  <p><strong>User: {r.name}</strong></p>
                  <p><small>Posted on: {format(new Date(r.date), "MMMM d, yyyy")}</small></p>
                </div>
              </div>
            ))}
          </div>
          {loaded && instanceRef.current && (
            <>
              <Arrow left onClick={(e) => { e.stopPropagation(); instanceRef.current?.prev(); }} disabled={currentSlide === 0} />
              <Arrow onClick={(e) => { e.stopPropagation(); instanceRef.current?.next(); }} disabled={currentSlide === instanceRef.current.track.details.slides.length - 1} />
            </>
          )}
        </div>
        {loaded && instanceRef.current && (
          <div className="dots">
            {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => (
              <button key={idx} onClick={() => instanceRef.current?.moveToIdx(idx)} className={"dot" + (currentSlide === idx ? " active" : "")}></button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewDisplay;
