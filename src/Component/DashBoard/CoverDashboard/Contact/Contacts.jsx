import React, { useEffect, useState } from "react";
import axios from "axios";
import { urlApi } from "../../../../utils/Constant";
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactPaginate from 'react-paginate';

const Contacts = () => {
  const [openMessages, setOpenMessages] = useState({});
  const [contacts, setContacts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const contactsPerPage = 7;
  const pagesVisited = pageNumber * contactsPerPage;

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    axios
      .get(`${urlApi}contacts`, { withCredentials: true })
      .then(res => {
        setContacts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm deletion',
      message: 'Are you sure you want to delete this contact?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios.delete(`${urlApi}contacts/${id}`, { withCredentials: true })
              .then(res => {
                toast.success('Contact deleted successfully');
                fetchContacts();
              })
              .catch(err => {
                console.log(err);
                toast.error('An error occurred while deleting the contact');
              });
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const displayContacts = contacts
    .slice(pagesVisited, pagesVisited + contactsPerPage)
    .map((contact, index) => (
      <ul className="order_list_body" style={{ gap: "50px" }} key={pagesVisited + index}>
        <li style={{ textAlign: 'left' }}># {pagesVisited + index + 1}</li>
        <li style={{ textAlign: 'left' }}>{contact.name}</li>
        <li style={{ textAlign: 'left' }}>{contact.email}</li>
        <li 
          style={{ textAlign: 'left' }} 
          onClick={() => setOpenMessages({ ...openMessages, [index]: !openMessages[index] })}
        >
          {openMessages[index] || contact.message.length <= 30 ? contact.message : contact.message.substring(0, 30) + '...'}
        </li>
        <li style={{ textAlign: 'left' }}>
          {new Date(contact.createdAt).toLocaleDateString('fr-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </li>
        <li style={{ textAlign: 'left' }}>
          <button 
            style={{ backgroundColor: '#dc3545', color: 'white', padding: '7px 20px', borderRadius: '5px', border: 'none' }} 
            onClick={() => handleDelete(contact._id)} 
          >
            Delete
          </button>
        </li>
      </ul>
    ));

  const pageCount = Math.ceil(contacts.length / contactsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="content">
      <div className="content_dashboard">
        <h1>Contact</h1>
        <ul className="order_list_header" style={{ gap: "50px" }}>
          <li style={{ textAlign: 'left' }}>Num</li>
          <li style={{ textAlign: 'left' }}>Name</li>
          <li style={{ textAlign: 'left' }}>Email</li>
          <li style={{ textAlign: 'left' }}>Message</li>
          <li style={{ textAlign: 'left' }}>Created At</li>
          <li style={{ textAlign: 'left' }}>Action</li>
        </ul>
        {displayContacts.length !== 0 ? displayContacts : <h1 style={{ textAlign: "center", color: "#c7b9b9", margin: "50px 0" }}>No contacts</h1>}
        <ReactPaginate
          previousLabel={'Prev'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={changePage}
          containerClassName={'pagination'}
          pageClassName={'page'}
          activeClassName={'active'}
          previousClassName={'previous'}
          nextClassName={'next'}
          disabledClassName={'disabled'}
          breakLinkClassName={'break-link'}
        />
      </div>
    </div>
  );
};

export default Contacts;