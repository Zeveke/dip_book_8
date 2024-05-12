import React from 'react';
import { Gallery } from './gallery';

export function About() {

  return (
    <>
      <section className="about py-5">
        <div className="container">
          <div className="text-center">
            <h3 className="text-decoration-underline">              
                О нашем отеле              
            </h3>
          </div>

          <div className="row mt-5">
            <div className="col-md-5 p-3">
              <img src="img/hotel.jpg" className="img-fluid w-100" alt="" />
            </div>
            <div className="col-md-7 p-3">
              <h4>Имя отеля</h4>
              <p className="lead">
                Своим именем отель обязан в целом талантливому и, как это часто бывает, 
                фактически не имеющему недостатков человеку. Фамилия этого чудо-персонажа ещё 130 лет назад красовалась 
                в названии грузового пароходства. Один из этих пароходов под именем "Севрюга"
                запечатлён и участвует в музыкальной комедии "Волга-Волга".
              </p>
              <p className="lead">
                Остаётся надежда, что всё задуманное M & Z воплотится в жизнь!
              </p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-7 p-3">
              <h4>История успеха</h4>
              <p className="lead">
              В 2011 г. M & Z приобрёл право аренды на не очень большой участок земли с перспективой продолжить 
              производство металлоконструкций. Однако позже акционеры решили эти площади 
              сдавать в аренду и в 2020 году почти открыли самый лучший лофт-отель 
               в городе на тучу номеров . Все номера почти оборудованы кондиционером, 
               телефоном, радио и телевизором.
              </p>
              <p className="lead">
                С тех пор мечты остаются мечтой, но имеют перспективу сбыться и найти свою реализацию!
              </p>
            </div>
            <div className="col-md-5 p-3">
              <img src="img/hotel-2.jpg" className="img-fluid w-100" alt="" />
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-5 p-3">
              <img src="img/chairperson.jpg" className="img-fluid w-100" alt="" />
            </div>
            <div className="col-md-7 p-3">
              <h4>Обращение творца</h4>
              <p className="lead">
                Всё успеть сложно, но очень хочется. Спокойствием и трудом решаются самые 
                сложные задачи. Сложное желательно разбивать на этапы и реализовывать их. 
                Часто полезно начинать с тяжёлых этапов. 
              </p>
              <p className="lead">
                Бывает приятно оглянутся назад и увидеть результаты своих усилий. Хорошо, 
                когда есть такая возможность! Если такой возможности нет, то очень вероятно, 
                что текущая занятость принесёт ещё больше желания окинуть взором ранее сделаное. 
                Успеха нам всем!
              </p>
            </div>
          </div>
        </div>
      </section>
       <div className='py-5'>
       <Gallery/>
       </div>
    </>
  );
}
