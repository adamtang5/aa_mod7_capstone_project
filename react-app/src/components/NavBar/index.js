import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import CreateIssueForm from '../Issue/CreateIssueForm';
import LogoutButton from '../auth/LogoutButton';
import Logo from '../Icons/MiraLogo';
import ProfileButton from '../ProfileButton';
import './NavBar.css';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const [showCreateIssueModal, setShowCreateIssueModal] = useState(false);

  if (!sessionUser) return null;

  const closeModal = () => {
    setShowCreateIssueModal(false);
  };

  return (
    <nav id="top-nav" className="flex-row">
      <div>
        <NavLink to='/' exact={true} activeClassName='active'>
          <Logo />
        </NavLink>
      </div>
      <div className="create-issue-modal">
        <div
          className="button create-issue cursor-pointer"
          onClick={() => setShowCreateIssueModal(true)}
        >Create Issue</div>
        {showCreateIssueModal && (
          <Modal onClose={() => setShowCreateIssueModal(false)}>
            <CreateIssueForm
              handleCloseModal={closeModal}
            />
          </Modal>
        )}
      </div>
      {/* <div>
        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>
      </div> */}
      {sessionUser && <ProfileButton user={sessionUser} />}
      {/* <div>
        <LogoutButton />
      </div> */}
    </nav>
  );
}

export default NavBar;
