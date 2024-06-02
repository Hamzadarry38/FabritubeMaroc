import "./Hero.css";
import { Arabic, French, English } from "../../../utils/Constant";
import { useContext } from "react";
import MyContext from "../../../ContextStateGlobal";

const Hero = () => {
  const { language } = useContext(MyContext);

  return (
    <>
      <div className="hero" id="home">
        <div className="hero_text">
          <h1>{language === 'ar' ? Arabic.hero[0] : language === 'fr' ? French.hero[0] : language === 'en' ? English.hero[0] : ''}</h1>
          <p className="paragraph">{language === 'ar' ? Arabic.hero[1] : language === 'fr' ? French.hero[1] : language === 'en' ? English.hero[1] : ''}</p>
        </div>
      </div>
      <div className="contenu" >
        <h1>{language === 'ar' ? Arabic.hero[2] : language === 'fr' ? French.hero[2] : language === 'en' ? English.hero[2] : ''}</h1>
        <p className="paragraph1">{language === 'ar' ? Arabic.hero[3] : language === 'fr' ? French.hero[3] : language === 'en' ? English.hero[3] : ''}</p>
        <div className="container_image" >
            <div className="image_and_title" >
              <img src="https://firebasestorage.googleapis.com/v0/b/atlantinox-cd2fb.appspot.com/o/Hero%2F4319259.png?alt=media&token=5f1af9a1-13a3-4877-91a2-6ebebfaf4786" alt="img" />
              <span><strong>{language === 'ar' ? Arabic.hero[4] : language === 'fr' ? French.hero[4] : language === 'en' ? English.hero[4] : ''}</strong></span>
            </div>
            <div className="image_and_title" >
              <img src="https://firebasestorage.googleapis.com/v0/b/atlantinox-cd2fb.appspot.com/o/Hero%2F3343387.png?alt=media&token=149d3353-4b0a-4676-b438-32ac7b121b0c" alt="img" />
              <span><strong>{language === 'ar' ? Arabic.hero[5] : language === 'fr' ? French.hero[5] : language === 'en' ? English.hero[5] : ''}</strong></span>
            </div>
            <div className="image_and_title" >
              <img src="https://firebasestorage.googleapis.com/v0/b/atlantinox-cd2fb.appspot.com/o/Hero%2F9708965.png?alt=media&token=f15d88b7-3961-465b-a269-3e4494f8b150" alt="img" />
              <span><strong>{language === 'ar' ? Arabic.hero[6] : language === 'fr' ? French.hero[6] : language === 'en' ? English.hero[6] : ''}</strong></span>
            </div>
            <div className="image_and_title" >
              <img src="https://firebasestorage.googleapis.com/v0/b/atlantinox-cd2fb.appspot.com/o/Hero%2F401501_164770%20.png?alt=media&token=b5d973fb-417d-4a8f-87a2-175a0b438891" alt="img" />
              <span><strong>{language === 'ar' ? Arabic.hero[7] : language === 'fr' ? French.hero[7] : language === 'en' ? English.hero[7] : ''}</strong></span>
            </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
