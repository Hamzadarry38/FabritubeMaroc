import "./About.css";
import { useContext } from "react";
import MyContext from "../../../ContextStateGlobal";
import { Arabic, French, English } from "../../../utils/Constant";

const About = () => {
  const { language } = useContext(MyContext);

  return (
    <>
    <div className="about" id="about">
        <div className="about_title">
            <h1>{language === 'ar' ? Arabic.about[0] : language === 'fr' ? French.about[0] : language === 'en' ? English.about[0] : ''}</h1>
        </div>
        <div className="about_right_left">
            <div className="about_right">
                <h3>{language === 'ar' ? Arabic.about[1] : language === 'fr' ? French.about[1] : language === 'en' ? English.about[1] : ''}</h3>
                <p>
                    {language === 'ar' ? Arabic.about[2] : language === 'fr' ? French.about[2] : language === 'en' ? English.about[2] : ''}
                </p>
            </div>
            <div className="about_left">
                <div className="about_left_img1">
                    <img src="https://firebasestorage.googleapis.com/v0/b/atlantinox-cd2fb.appspot.com/o/About%2Fdepositphotos_309071080-stock-photo-different-metal-rolled-products-stainless.jpg?alt=media&token=f7551f3c-4b7e-4da5-bc02-22d7ddb4b653" alt="about" />
                </div>
            </div>
        </div>
    </div>
    <div className="how-it-works">
      <h2>{language === 'ar' ? Arabic.about[3] : language === 'fr' ? French.about[3] : language === 'en' ? English.about[3] : ''}</h2>
      <div className="steps">
        <div className="step">
          <h3>{language === 'ar' ? Arabic.about[4].split('-')[0] : language === 'fr' ? French.about[4].split('-')[0] : language === 'en' ? English.about[4].split('-')[0] : ''}</h3>
          <p>{language === 'ar' ? Arabic.about[4].split('-')[1] : language === 'fr' ? French.about[4].split('-')[1] : language === 'en' ? English.about[4].split('-')[1] : ''}</p>
        </div>
        <div className="step">
          <h3>{language === 'ar' ? Arabic.about[5].split('-')[0] : language === 'fr' ? French.about[5].split('-')[0] : language === 'en' ? English.about[5].split('-')[0] : ''}</h3>
          <p>{language === 'ar' ? Arabic.about[5].split('-')[1] : language === 'fr' ? French.about[5].split('-')[1] : language === 'en' ? English.about[5].split('-')[1] : ''}</p>
        </div>
        <div className="step">
          <h3>{language === 'ar' ? Arabic.about[6].split('-')[0] : language === 'fr' ? French.about[6].split('-')[0] : language === 'en' ? English.about[6].split('-')[0] : ''}</h3>
          <p>{language === 'ar' ? Arabic.about[6].split('-')[1] : language === 'fr' ? French.about[6].split('-')[1] : language === 'en' ? English.about[6].split('-')[1] : ''}</p>
        </div>
        <div className="step">
          <h3>{language === 'ar' ? Arabic.about[7].split('-')[0] : language === 'fr' ? French.about[7].split('-')[0] : language === 'en' ? English.about[7].split('-')[0] : ''}</h3>
          <p>{language === 'ar' ? Arabic.about[7].split('-')[1] : language === 'fr' ? French.about[7].split('-')[1] : language === 'en' ? English.about[7].split('-')[1] : ''}</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default About
