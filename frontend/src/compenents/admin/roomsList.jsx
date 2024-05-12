import React, { useEffect, useState, useCallback } from 'react';
import { NavBar } from './nav';
import { AdminSidebar } from './sidebar';
import { addRoom, deleteRoomByID, getRooms, updateRoom } from '../../sevices/room.services';
import { Modal, Carousel, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';


export function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showEditRoom, setShowEditRoom] = useState(false);

  

  const fetchRooms = useCallback(async () => {
    try {
      const res = await getRooms(query);
      setRooms(res.data);
    } catch (error) {
      console.error("Ошибка при выборе комнат:", error);
    }
  }, [query]);

  useEffect(() => {
    fetchRooms();
  }, [query, fetchRooms]);

  
  const [newRoomData, setNewRoomData] = useState({
    name: "",
    maxcount: 0,
    phoneNumber: 0,
    rentperday: 0,
    image: [],
    type: "",
    description: "",
  });
  
  const handleShowAddRoom = () => {
    setShowAddRoom(true);
  };

  const handleCloseAddRoom = () => {
    setShowAddRoom(false);
  };

  const handleFormFieldChange = (e) => {
    const { name, value } = e.target;
    setNewRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    
    const imagesArray = Array.from(files);
    setNewRoomData((prevData) => ({
      ...prevData,
      image: imagesArray,
    }));
  };

  const handleAddRoomSubmit = async () => {
    try {
      if (!newRoomData.type) {
        console.error("Ошибка при добавлении номера: требуется указать тип");
        return;
      }
      const formData = new FormData();
      formData.append("roomData", JSON.stringify(newRoomData));
  
      newRoomData.image.forEach((image, index) => {
        formData.append("roomImages", image);
      });
  
      await addRoom(formData);
      fetchRooms();
      setShowAddRoom(false);
    } catch (error) {
      console.error("Ошибка при добавлении комнаты:", error);
    }
  };
  
  

  


  async function deleteRoom(id) {
    try {
      await deleteRoomByID(id);
      fetchRooms();
      Swal.fire('Congrats', 'Комната была успешно удалена', 'success').then(result => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Ошибка при удалении комнаты:", error);
      Swal.fire('Oops', 'У номера есть активные бронирования, вы не можете удалить его', 'error');
    }
  }

  
  const handleShowDetails = (room) => {
    setSelectedRoom(room);
    setShowDetails(true);
  };
  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  

  const handleCloseEditRoom = () => {
    setShowEditRoom(false);
  };

  
  const [editRoomData, setEditRoomData] = useState({
    name: "",
    maxcount: 0,
    phoneNumber: 0,
    rentperday: 0,
    image: [],     
    type: "",
    description: "",
  });
  
  
  const handleEditImageChange = (e) => {
    const { files } = e.target;
    
    const imagesArray = Array.from(files);
    setEditRoomData((prevData) => ({
      ...prevData,
      image: imagesArray,
    }));
  };
  

const handleShowEditRoom = (room) => {
  console.log("Room ID:", room._id);
  if (!room._id) {
    console.error("Идентификатор комнаты не определен.");
    return;
  }

  setSelectedRoom(room);
  setEditRoomData({
    name: room.name,
    maxcount: room.maxcount,
    phoneNumber: room.phoneNumber,
    rentperday: room.rentperday,
    image: Array.isArray(room.image) ? room.image : [room.image], 
    type: room.type,
    description: room.description,
  });
  setShowEditRoom(true);
};


const handleEditFormFieldChange = (e) => {
  const { name, value, files } = e.target;

  if (name === 'image') {
    const imagesArray = Array.from(files);
    setEditRoomData((prevData) => ({
      ...prevData,
      image: imagesArray,
    }));
  } else {
    setEditRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
};

const handleEditRoomSubmit = async () => {
  try {
    const formData = new FormData();

    
    formData.append("name", editRoomData.name);
    formData.append("maxcount", editRoomData.maxcount);
    formData.append("phoneNumber", editRoomData.phoneNumber);
    formData.append("rentperday", editRoomData.rentperday);
    formData.append("type", editRoomData.type);
    formData.append("description", editRoomData.description);

    
    editRoomData.image.forEach((image, index) => {
      formData.append(`roomImages`, image);
    });

    const response = await updateRoom(selectedRoom._id, formData);
    console.log('Обновить ответ по комнате:', response);

    fetchRooms();
    setShowEditRoom(false);
  } catch (error) {
    console.error("Ошибка обновления комнаты:", error);
  }
};

  
  return (
    <>
      <NavBar />
      <AdminSidebar />

      <main id="main" className="flexbox-col p-5">
        <h2 className="mb-2 ml-5">Список номеров</h2>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button variant="success" onClick={handleShowAddRoom} className="custom-button">Добавить номер</Button>
          <Form.Control type="search" className="w-50 ml-3" onChange={e => setQuery(e.target.value)} placeholder="Введите название" />
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Название</th>
              <th>Фото</th>
              <th>Вместимость</th>
              <th>Номер</th>
              <th>Прайс за сутки</th>
              <th>Тип</th>
              <th>Действия</th>
              <th>Подробности</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={room._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{room.name}</td>
                <td><img height={100} width={100} src={`${process.env.REACT_APP_API_HOST}${room.image[0]}`} alt="" /></td>
                <td>{room.maxcount}</td>
                <td>{room.phoneNumber}</td>
                <td>{room.rentperday}</td>
                <td>{room.type}</td>
                <td>
                    <button className="custom-button1" onClick={() => handleShowEditRoom(room)}>
                      Edit
                    </button>
                    
                  <button className="custom-button2" onClick={() => deleteRoom(room._id)}>
                    Delete
                  </button>
                </td>
                <td>
                  <button className="custom-button" onClick={() => handleShowDetails(room)}>
                  Смотрите подробности
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Modal show={showDetails} onHide={handleCloseDetails} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedRoom && selectedRoom.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedRoom && (
              <div>
                <Carousel>
                  {selectedRoom.image.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img className="d-block w-100" src={`${process.env.REACT_APP_API_HOST}${image}`} alt={`Slide ${index}`} />
                    </Carousel.Item>
                  ))}
                </Carousel>
                <p><strong>Подробности:</strong> {selectedRoom.description}</p>
              </div>
            )}
          </Modal.Body>
        </Modal>



        <Modal show={showAddRoom} onHide={handleCloseAddRoom} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Добавить номер</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите имя номера"
                name="name"
                value={newRoomData.name}
                onChange={handleFormFieldChange}
              />
            </Form.Group>

            <Form.Group controlId="maxcount">
              <Form.Label>Максимальное количество</Form.Label>
              <Form.Control
                type="number"
                placeholder="Введите максимальное количество"
                name="maxcount"
                value={newRoomData.maxcount}
                onChange={handleFormFieldChange}
              />
            </Form.Group>

            <Form.Group controlId="phoneNumber">
              <Form.Label>Номер </Form.Label>
              <Form.Control
                type="number"
                placeholder="Введите номер телефона"
                name="phoneNumber"
                value={newRoomData.phoneNumber}
                onChange={handleFormFieldChange}
              />
            </Form.Group>

            <Form.Group controlId="rentperday">
              <Form.Label>Арендная плата за сутки</Form.Label>
              <Form.Control
                type="number"
                placeholder="Введите арендную плату за день"
                name="rentperday"
                value={newRoomData.rentperday}
                onChange={handleFormFieldChange}
              />
            </Form.Group>

            <Form.Group controlId="images">
              <Form.Label>Фото</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={handleImageChange}
              />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Тип</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={newRoomData.type}
                onChange={handleFormFieldChange}
              >
                <option value="">--</option>
                <option value="Single">1 местный</option>
                <option value="Double">3х местный</option>
                <option value="Suite">7ми местный</option>
              </Form.Control>
            </Form.Group>


            <Form.Group controlId="description">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Введите описание комнаты"
                name="description"
                value={newRoomData.description}
                onChange={handleFormFieldChange}
              />
            </Form.Group>

            <Button variant="primary mt-4" onClick={handleAddRoomSubmit}>
              Добавить номер
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showEditRoom} onHide={handleCloseEditRoom} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Редактировать номер</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <Form enctype="multipart/form-data">
      <Form.Group controlId="name">
        <Form.Label>Название</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите название"
          name="name"
          value={editRoomData.name} 
          onChange={handleEditFormFieldChange}
        />
      </Form.Group>

      <Form.Group controlId="maxcount">
        <Form.Label>Максимальное количество</Form.Label>
        <Form.Control
          type="number"
          placeholder="Введите количество"
          name="maxcount"
          value={editRoomData.maxcount}
          onChange={handleEditFormFieldChange}
        />
      </Form.Group>

      <Form.Group controlId="phoneNumber">
        <Form.Label>Номер </Form.Label>
        <Form.Control
          type="number"
          placeholder="Введите номер"
          name="phoneNumber"
          value={editRoomData.phoneNumber}
          onChange={handleEditFormFieldChange}
        />
      </Form.Group>

      <Form.Group controlId="rentperday">
        <Form.Label>Арендная плата за сутки</Form.Label>
        <Form.Control
          type="number"
          placeholder="Введите арендную плату за день"
          name="rentperday"
          value={editRoomData.rentperday}
          onChange={handleEditFormFieldChange}
        />
      </Form.Group>
      <Form.Group controlId="images">
        <Form.Label>Фото</Form.Label>
        <Form.Control
          type="file"
          multiple = 'true'
          onChange={handleEditImageChange}
        />
      </Form.Group>

      <Form.Group controlId="type">
        <Form.Label>Тип</Form.Label>
        <Form.Control
          as="select"
          name="type"
          value={editRoomData.type}
          onChange={handleEditFormFieldChange}
        >
          <option value="Single">1 местный</option>
          <option value="Double">3х местный</option>
          <option value="Suite">7ми местный</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Описание</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Введите описание комнаты"
          name="description"
          value={editRoomData.description}
          onChange={handleEditFormFieldChange}
        />
      </Form.Group>

      <Button variant="primary mt-4" onClick={handleEditRoomSubmit}>
      Сохранить изменения
      </Button>
    </Form>
  </Modal.Body>
</Modal>

      </main>
    </>
  );
}
