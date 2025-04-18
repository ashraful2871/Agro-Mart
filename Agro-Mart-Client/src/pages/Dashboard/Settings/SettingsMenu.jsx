import { NavLink } from "react-router-dom";
import { FaUserCog, FaMapMarkerAlt, FaEnvelopeOpenText, FaLanguage, FaLock, FaFileContract, FaQuestionCircle, FaCommentDots, FaUserSlash, FaSignOutAlt } from "react-icons/fa";
import { RiCouponFill } from "react-icons/ri";

const SettingsMenu = () => {
    return (
       
            <div>
              <ul className="menu font-semibold text-base text-base-content">
                <li className="py-3">
                  <NavLink
                    to="/settings/account-info"
                    className={({ isActive }) =>
                      isActive ? "text-green-600 border-l-4 border-green-600" : ""
                    }
                  >
                    <FaUserCog className="text-xl ml-2" /> Account Information
                  </NavLink>
                </li>
        
                <li className="py-3">
                  <NavLink
                    to="/settings/address-book"
                    className={({ isActive }) =>
                      isActive ? "text-green-600 border-l-4 border-green-600" : ""
                    }
                  >
                    <FaMapMarkerAlt className="text-xl ml-2" /> Address Book
                  </NavLink>
                </li>
        
                <li className="py-3">
                  <NavLink
                    to="/settings/messages"
                    className={({ isActive }) =>
                      isActive ? "text-green-600 border-l-4 border-green-600" : ""
                    }
                  >
                    <FaEnvelopeOpenText className="text-xl ml-2" /> Messages
                  </NavLink>
                </li>
        
                <li className="py-3">
                  <NavLink
                    to="/settings/language"
                    className={({ isActive }) =>
                      isActive ? "text-green-600 border-l-4 border-green-600" : ""
                    }
                  >
                    <FaLanguage className="text-xl ml-2" /> Language
                  </NavLink>
                </li>
        
                <li className="py-3">
                  <NavLink
                    to="/settings/security"
                    className={({ isActive }) =>
                      isActive ? "text-green-600 border-l-4 border-green-600" : ""
                    }
                  >
                    <FaLock className="text-xl ml-2" /> Account Security
                  </NavLink>
                </li>

                <li className="py-3">
                  <NavLink
                    to="/settings/coupon-settings"
                    className={({ isActive }) =>
                      isActive ? "text-green-600 border-l-4 border-green-600" : ""
                    }
                  >
                    <RiCouponFill className="text-xl ml-2" /> Coupon Code
                  </NavLink>
                </li>
        
                <li className="py-3">
                  <NavLink
                    to="/settings/conditions"
                    className={({ isActive }) =>
                      isActive ? "text-green-600 border-l-4 border-green-600" : ""
                    }
                  >
                    <FaFileContract className="text-xl ml-2" /> Conditions
                  </NavLink>
                </li>
        
                <li className="py-3">
                  <NavLink
                    to="/settings/help"
                    className={({ isActive }) =>
                      isActive ? "text-green-600 border-l-4 border-green-600" : ""
                    }
                  >
                    <FaQuestionCircle className="text-xl ml-2" /> Help
                  </NavLink>
                </li>
        
                <li className="py-3">
                  <NavLink
                    to="/settings/feedback"
                    className={({ isActive }) =>
                      isActive ? "text-green-600 border-l-4 border-green-600" : ""
                    }
                  >
                    <FaCommentDots className="text-xl ml-2" /> Feedback
                  </NavLink>
                </li>
        
                <li className="py-3">
                  <NavLink
                    to="/settings/delete-account"
                    className={({ isActive }) =>
                      isActive ? "text-green-600 border-l-4 border-green-600" : ""
                    }
                  >
                    <FaUserSlash className="text-xl ml-2" /> Request Account Deletion
                  </NavLink>
                </li>
              </ul>
            </div>
    );
};

export default SettingsMenu;