import React from "react";
import "./css/main-slide.css";
import "./css/about-slide.css";
import "./css/contact-slide.css";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import Form from "./common/form";
// import SlideShow from "./common/slideShow";
import { Link } from "react-scroll";
import { AiTwotonePhone, AiTwotoneMail, AiFillHome } from "react-icons/ai";

class App extends Form {
  state = {
    currencies: { USDKZT: "", USDXAU: "", USDBTC: "", oil: "" },
    data: { name: "", phone: "", email: "", city: "" },
    errors: {},
    scrolled: false,
    isSubmitted: false,
    lol: false,
  };

  doSubmit = () => {
    const now = new Date().getTime();
    const expire = localStorage.getItem("expire") || 0;
    if (now >= expire) {
      axios.post("/api/sendEmail", this.state.data);
      this.state.isSubmitted = true;
      const expireTime = now + 600000;
      localStorage.setItem("expire", expireTime);
    }
  };

  async componentDidMount() {
    const link1 =
      "http://apilayer.net/api/live?access_key=29441c0bec284edff6e3916c4df75c31&currencies=KZT,XAU,BTC&source=USD&format=1";
    const link2 =
      "https://api.eia.gov/series/?api_key=40693bc9d7dc317a7dfb6b0687cc263c&series_id=PET.RBRTE.D";
    const requiest1 = await axios.get(link1);
    const requiest2 = await axios.get(link2);
    this.setState({
      currencies: requiest1.data.quotes,
      oil: requiest2.data.series[0].data[0][1],
    });
    AOS.init({
      duration: 2000,
    });
    window.addEventListener("scroll", () => {
      var isTop = window.scrollY < 100;
      if (window.innerWidth <= 768) {
        isTop = 10;
      }
      if (isTop !== true) {
        this.setState({ scrolled: true });
      } else {
        this.setState({ scrolled: false });
      }
    });
  }

  render() {
    const { currencies, oil, scrolled, isSubmitted } = this.state;
    const kzt = (1 * currencies.USDKZT).toFixed(2);
    const xau = (1 / currencies.USDXAU).toFixed(2);
    const btc = (1 / currencies.USDBTC).toFixed(2);
    const oilBrent = (1 * oil).toFixed(2);
    const now = new Date().getTime();
    const expire = localStorage.getItem("expire");
    const remain = ((expire - now) / 60000) | 0;
    return (
      <div className="bg-image">
        <div className="bg-color">
          <div className="ticker-box" id="main">
            <div>
              <p>USD | {kzt} KZT</p>
              <p>XAUUSD | {xau} USD</p>
              <p>BTC | {btc} USD</p>
              <p>BRENT | {oilBrent} USD</p>
            </div>
            <div>
              <p>USD | {kzt} KZT</p>
              <p>XAUUSD | {xau} USD</p>
              <p>BTC | {btc} USD</p>
              <p>BRENT | {oilBrent} USD</p>
            </div>
          </div>
          <nav className={scrolled ? "is-scrolled" : ""}>
            <ul data-aos="fade">
              <li>
                <Link to="main" smooth={true} duration={1000}>
                  Главное
                </Link>
              </li>
              <li>
                <Link to="why" smooth={true} duration={1000} offset={-45}>
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  to="consultation"
                  smooth={true}
                  duration={1000}
                  offset={-45}
                >
                  Консультация
                </Link>
              </li>
            </ul>
            <div className="info-box" data-aos="fade">
              <AiTwotonePhone className="icon" />
              <span>+7(777)-115-65-64</span>
              <AiTwotoneMail className="icon" />
              <p>support@kazfinance.com info@kazfinance.com</p>
              <AiFillHome className="icon" />
              <p>Бекхожина, 15а</p>
            </div>
          </nav>
          <img
            className="logo-image"
            src="/images/logo.png"
            alt=""
            data-aos="zoom-in"
          ></img>
          <p data-aos="fade-up">Инвестируй в свое будущее!</p>
          <i
            className={!scrolled ? "arrow-down" : "isSelected-arrow-down"}
            data-aos="fade-up"
          ></i>
          <div className="title-1" id="why">
            О НАС
          </div>
          <div className="person-box" data-aos="fade-up">
            <div className="para-1">
              <div>
                <img className="person-image" src="/images/AE.jpg" alt=""></img>
                <p>Генеральный директор</p>
                <p>ТОО KAZFINANCE</p>
                <p>Утеулин Айнар Ерикович</p>
              </div>
              <p className="text">
                В наше время качество жизни определяется уровнем благосостояния
                человека. Каждый пытается решить этот вопрос по-разному, кто-то
                пытается подниматься по карьерной лестнице на наемной работе,
                кто-то пытается улучшить качество жизни, занимаясь бизнесом,
                кто-то пытает счастья на тендерных биржах, вариантов можно
                перечислять без остановки, но если задуматься, разве именно
                выбор определённого вида деятельности гарантирует нам успех и
                финансовую независимость? Наши бесконечные поиски идеального
                рода деятельности, который без каких-либо рисков будет приносить
                нам высокие доходы до конца наших дней, приводят нас обратно к
                точке старта снова и снова, где мы задаемся вопросом, чем бы нам
                заниматься.
              </p>
            </div>
            <p className="text">
              Задумайтесь, можно быть богатым, занимаясь абсолютно любым видом
              деятельности, абсолютно в любой сфере, главное - это быть
              финансово грамотным, а правильное инвестирование - безопасность
              ваших будущих дней, ведь уберечь свои деньги стоит больших трудов,
              чем добыть их. Деньги как репутация: заработать легче, чем
              сохранить. Если говорить вкратце, то инвестирование - это способ
              сохранения и приумножения уже имеющихся средств, и на личном
              опыте, могу вас заверить, что под определением "уже имеющихся
              средств" я не имею в виду миллионы или миллиарды свободных денег.
              Пора менять свой подход к распределению финансов, и тогда, Вы
              удивитесь, как Ваша жизнь изменится, как изменилась когда-то моя.
            </p>
          </div>
          <div className="video-container" data-aos="fade-up">
            <iframe
              width="80%"
              height="100%"
              src="https://www.youtube.com/embed/HchmMsUgsPI?autoplay=0&mute=0"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen="true"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
            ></iframe>
          </div>
          <div className="why-box" data-aos="fade-up">
            <p>
              В нынешнее время образование - это неотъемлемый этап в жизни
              каждого человека, и получать специальное образование можно как в
              10, так и в 100 лет. Мы сделали этот процесс максимально удобным и
              непринужденным, т.к финансовая грамотность - это всегда актуальная
              и нужная тема для любого человека в нашей стране. К сожалению
              статистика не на нашей стороне, среди 20 миллионного населения
              Казахстана процент финансово грамотных людей составляет 0.9%, это
              крайне печальные цифры. Мы как компания специализирующееся на
              обучении именно на фин.грамотности крайне озадачены этой
              проблемой.
            </p>
            <p>
              Так почему же в Казахстане так мало финансово грамотных людей?!
              Ответ прост, система образования сводится к изучению основных
              предметов и наук, любой человек окончивший школу умеет читать и
              писать, но его не научили очень важным вещам:как сохранять и
              преумножать свои деньги? От чего зависит национальный курс Валюты,
              почему такие большие проценты на кредит в банке. Он может знать
              высшую математику, но он не знает почему инфляция в Казахстане
              растет ежегодно.
            </p>
            <p>
              Наше скромное мнение таково - Фин.грамотность - это тот предмет
              которому должны преподавать еще с начальных классов, но т.к мы не
              можем поменять систему образования, мы можем поменять именно вас,
              вы пройдя этот курс, заживете по новому, такие термины как
              инфляция и диверсификация станут обыденными для вас.
              Задумайтесь... Может пришло время поменять жизнь в лучшую сторону
              Тем более первая консультация пройдёт абсолютно бесплатно. Хватит
              бояться знаний, хватит бояться спросить.
            </p>
          </div>
          <div className="title-1" id="consultation">
            КОНСУЛЬТАЦИЯ
          </div>
          <div className="courses-box" data-aos="fade-up">
            <ul>
              <p>По окончании курса вы: </p>
              <li>Получите сертификат о прохождении курса</li>
              <li>
                Узнаете основы экономики и будете в курсе всех мировых событий и
                их взаимосвязь с нашей повседневной жизнью
              </li>
              <li>
                Научитесь распознавать актуальные на текущий момент
                инвестиционные направления и создавать инвестиционные портфели
                основываясь на этих знаниях
              </li>
            </ul>
            <div className="course">
              <div>Базовый курс</div>
              <div>Основы управления финансами</div>
              <div className="prices-box">
                <div>30000тг</div>
                <div>45000тг</div>
              </div>
              <div>Ограниченное предложение!</div>
              <Link
                className="scroll-button"
                to="Consultation"
                smooth={true}
                duration={1000}
              >
                Записаться
              </Link>
            </div>
            <div className="course">
              <div>
                Продвинутый
                <br />
                Курс
              </div>
              <div>
                Виды инвестиции,
                <br />
                создание инвестиционного портфеля
              </div>
              <div className="prices-box">
                <div>70000тг</div>
                <div>85000тг</div>
              </div>
              <div>Ограниченное предложение!</div>
              <Link
                className="scroll-button"
                to="Consultation"
                smooth={true}
                duration={1000}
              >
                Записаться
              </Link>
              <span>Популярный</span>
            </div>
          </div>
          <form
            className="form-box"
            onClick={this.handleCursor}
            data-aos="fade-up"
            id="Consultation"
          >
            <h1>Записаться на консультацию!</h1>
            {this.renderInput("Имя и Фамилия", "name")}
            {this.renderInput("Телефон", "phone")}
            {this.renderInput("Почта", "email")}
            {this.renderInput("Город", "city")}
            <div>
              {isSubmitted && (
                <p style={{ color: "green" }}>Успешно отправлено!</p>
              )}
              {remain > 0 && (
                <p>
                  {"Чтобы отправить новую заявку, подождите " +
                    remain +
                    (remain > 3 ? " минут" : " минуты")}
                </p>
              )}
            </div>
            {this.renderButton("Отправить")}
          </form>
        </div>
      </div>
    );
  }
}

export default App;
