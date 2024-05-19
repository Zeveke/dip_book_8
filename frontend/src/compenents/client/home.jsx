import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';


export function Home() {
  const navigate = useNavigate();

  const handleCheckAvailabilityClick = () => {   
    navigate('/reservation');
  };
  
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="offer bg-white d-inline-flex m-auto">
            <p className="mb-0 lead text-uppercase">
            </p>
          </div>
          <Button
            className="btn rounded-0 w-200 ml-2"
            onClick={handleCheckAvailabilityClick}
            style={{ backgroundColor: "#FFA500", color: "white" }}
          >
            Выбери даты и номера
          </Button>
          <div className="availability mt-4">
            <form action="reservation">
              <div className="card shadow border-0 rounded-0">               
                </div>
            </form>
          </div>
          {/* Check availability */}
        </div>
      </section>
      {/* Hero */}

      {/* About us */}
      <section className="about py-5">
        <div className="container">
          <div className="text-center">
            <h4>Немного о нас</h4>
            <p className="lead">
            Добро пожаловать в отель M&Z.

Насладитесь непревзойденной роскошью в самом сердце нашего эксклюзивного оазиса, отеля M&Z. Расположенный в тихом месте, наш отель предлагает вам незабываемые впечатления, сочетающие элегантность, комфорт и исключительный сервис.

Просторные и элегантно оформленные номера приглашают вас в спокойную гавань с потрясающим видом на живописные окрестности. Каждая деталь была тщательно продумана, чтобы создать теплую и гостеприимную атмосферу, позволяющую отвлечься от повседневных забот.

Наша преданная своему делу команда готова сделать ваше пребывание незабываемым. Воспользуйтесь нашими первоклассными услугами консьержа, чтобы организовать экскурсии, изысканные блюда или уникальные впечатления. Путешествуете ли вы по делам или для развлечения, мы здесь, чтобы удовлетворить все ваши потребности.
</p>
    <p className="lead">
В нашем ресторане подают изысканные блюда, приготовленные из высококачественных местных продуктов. Отдохните в баре с эксклюзивным выбором вин, коктейлей ручной работы и прохладительных напитков.

Исследуйте окрестности, откройте для себя захватывающие пейзажи и погрузитесь в спокойствие, характерное для нашего заведения. M&Z-это гораздо больше, чем просто отель, это место, где воплощаются в жизнь ваши мечты.

Бронируйте сейчас и окунитесь в атмосферу непревзойденной роскоши в отеле M&Z. Мы с нетерпением ждем возможности приветствовать вас в нашем эксклюзивном убежище, где гармонично сочетаются комфорт и элегантность.


                </p>
            <a href="about" className="btn btn-orange mt-5 w-200"   style={{ backgroundColor: "#FFA500", color: "white" }}>
              Читайте подробности
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
