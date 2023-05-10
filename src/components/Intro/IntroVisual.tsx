import LogoTitleSVG from '@/assets/intro/logo_title.svg';
import Link from 'next/link';

function IntroVisual() {
  return (
    <div className="intro">
      <>
        <div className="intro-gallaxy" />
        <div className="intro-visual">
          <div className="solar-system">
            <div className="solar-system__orbits solar-system__orbits--sun">
              <div className="solar-system__orbit solar-system__orbit--sun">
                <div className="solar-system__icon solar-system__icon--sun" />
              </div>
            </div>
            <div className="solar-system__orbits solar-system__orbits--mercury">
              <div className="solar-system__orbit solar-system__orbit--mercury">
                <div className="solar-system__planet solar-system__planet--mercury">
                  <div className="solar-system__icon solar-system__icon--mercury" />
                </div>
              </div>
            </div>
            <div className="solar-system__orbits solar-system__orbits--rocket">
              <div className="solar-system__orbit solar-system__orbit--rocket">
                <div className="solar-system__object solar-system__object--rocket">
                  <div className="solar-system__icon solar-system__icon--rocket" />
                </div>
              </div>
            </div>
            <div className="solar-system__orbits solar-system__orbits--venus">
              <div className="solar-system__orbit solar-system__orbit--venus">
                <div className="solar-system__planet solar-system__planet--venus">
                  <div className="solar-system__icon solar-system__icon--venus" />
                </div>
              </div>
            </div>
            <div className="solar-system__orbits solar-system__orbits--satellite">
              <div className="solar-system__orbit solar-system__orbit--satellite">
                <div className="solar-system__object solar-system__object--satellite">
                  <div className="solar-system__icon solar-system__icon--satellite" />
                </div>
              </div>
            </div>
            <div className="solar-system__orbits solar-system__orbits--earth">
              <div className="solar-system__orbit solar-system__orbit--earth">
                <div className="solar-system__planet solar-system__planet--earth">
                  <div className="solar-system__planet solar-system__planet--moon">
                    <div className="solar-system__icon solar-system__icon--moon" />
                  </div>
                  <div className="solar-system__icon solar-system__icon--earth" />
                </div>
              </div>
            </div>
            <div className="solar-system__orbits solar-system__orbits--astronaut">
              <div className="solar-system__orbit solar-system__orbit--astronaut">
                <div className="solar-system__object solar-system__object--astronaut">
                  <div className="solar-system__icon solar-system__icon--astronaut" />
                </div>
              </div>
            </div>
            <div className="solar-system__orbits solar-system__orbits--mars">
              <div className="solar-system__orbit solar-system__orbit--mars">
                <div className="solar-system__planet solar-system__planet--mars">
                  <div className="solar-system__icon solar-system__icon--mars" />
                </div>
              </div>
            </div>
            <div className="solar-system__orbits solar-system__orbits--jupiter">
              <div className="solar-system__orbit solar-system__orbit--jupiter">
                <div className="solar-system__planet solar-system__planet--jupiter">
                  <div className="solar-system__icon solar-system__icon--jupiter" />
                </div>
              </div>
            </div>
            <div className="solar-system__orbits solar-system__orbits--saturn">
              <div className="solar-system__orbit solar-system__orbit--saturn">
                <div className="solar-system__planet solar-system__planet--saturn">
                  <div className="solar-system__icon solar-system__icon--saturn" />
                </div>
              </div>
            </div>
            <div className="solar-system__orbits solar-system__orbits--uranus">
              <div className="solar-system__orbit solar-system__orbit--uranus">
                <div className="solar-system__planet solar-system__planet--uranus">
                  <div className="solar-system__icon solar-system__icon--uranus" />
                </div>
              </div>
            </div>
            <div className="solar-system__orbits solar-system__orbits--neptune">
              <div className="solar-system__orbit solar-system__orbit--neptune">
                <div className="solar-system__planet solar-system__planet--neptune">
                  <div className="solar-system__icon solar-system__icon--neptune" />
                </div>
              </div>
            </div>
            <div className="solar-system__orbits"></div>
            <div className="solar-system__orbits"></div>
            <div className="solar-system__orbits"></div>
          </div>
        </div>
        <div className="intro-title">
          <h1 className="title-logo">
            <LogoTitleSVG />
          </h1>
          <p className="title-summary">우주 테마 소셜 네트워크</p>
          <div className="intro-btns">
            <Link href="/login" className="btn btn-primary btn-md en">
              START
            </Link>
          </div>
        </div>
      </>
    </div>
  );
}

export default IntroVisual;
