import React, { useEffect, useState, useCallback } from 'react';
import { NavBar } from './nav';
import { AdminSidebar } from './sidebar';
import { deleteUserById, getUsers } from '../../sevices/login.services';
import Swal from 'sweetalert2';
import Button from '../Button';

export function UserList() {
  const [users, setUsers] = useState([]);
  const [isAdminQuery, setIsAdminQuery] = useState("");
  const [isUserQuery, setIsUserQuery] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      
      const adminUsers = await getUsers(isAdminQuery, true);

      
      const regularUsers = await getUsers(isUserQuery, false);

      setUsers({
        adminUsers: adminUsers.data.filter((user) => user.isAdmin),
        regularUsers: regularUsers.data.filter((user) => !user.isAdmin),
      });

    } catch (error) {
      console.error("Ошибка при выборке пользователей:", error);
      Swal.fire('Oops', 'У пользователя есть активные бронирования, которые не могут быть удалены', 'error');
    }
  }, [isAdminQuery, isUserQuery]); 

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); 

  async function deleteUser(id) {
    try {
      await deleteUserById(id);
      fetchUsers(); 
      Swal.fire('Deleted', 'Пользователь был успешно удален', 'success');
    } catch (error) {
      
      if (error.response && error.response.status === 403) {
        Swal.fire('Forbidden', "У вас нет прав на удаление этого пользователя", 'error');
      } else {
        Swal.fire('Error', 'При удалении пользователя произошла ошибка', 'error');
      }
      console.error("Ошибка при удалении пользователя:", error);
    }
  }
  

  return (
    <>
      <NavBar />
      <AdminSidebar />

      <main id="main" className="flexbox-col p-5">
        <div className="d-flex">
          <div className="mr-5">
            <h2>Администраторы</h2>
            <input
              type="search"
              className="form-control mb-2"
              onChange={(e) => setIsAdminQuery(e.target.value)}
              placeholder="Искать по имени или почте"
            />
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Почта</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {users.adminUsers && 
                  users.adminUsers.map((user, index) => (
                    <tr key={user._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>                      
                <Button onClick={(e) => deleteUser(user._id)} name="Удалить пользователя" className="custom-button2" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2>Пользователи</h2>
            <input
              type="search"
              className="form-control mb-2"
              onChange={(e) => setIsUserQuery(e.target.value)}
              placeholder="Искать по имени"
            />
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Почта</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {users.regularUsers &&
                  users.regularUsers.map((user, index) => (
                    <tr key={user._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>                    
                <Button onClick={(e) => deleteUser(user._id)} name="Удалить пользователя" className="custom-button2" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
