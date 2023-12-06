import { Modal, message, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetAllBids } from "../../../apicalls/products";
import { SetLoader } from "../../../redux/loadersSlice";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserBids() {
  const [bidsData, setBidsData] = React.useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const handleNameClick = (user) => {
    navigate(`/profile/${user._id}`); // Navigate to UserDetails page
  };

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      let response = await GetAllBids({
        user: user._id,
      });
      response = response.data.filter(item => item.product !== null);
      dispatch(SetLoader(false));
      if (response.success) {
        setBidsData(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
        title: "Product",
        dataIndex: "product",
        render: (text, record) => {
            return record.product.name;
        }
    },
    {
      title: "Bid Placed On",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("DD-MM-YYYY hh:mm a");
      },
    },
    {
      title: "Seller Name",
      dataIndex: "seller",
      render: (text, record) => {
        return (
          <span
            className="cursor-pointer underline"
            onClick={() => handleNameClick(record.seller)}
          >
            {record.seller.name}
          </span>
        );
      },
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },
    {
      title: "Bid Date",
      dataIndex: "createAt",
      render: (text, record) => {
        return moment(text).format("DD-MM-YYYY hh:mm a");
      },
    },
    {
      title: "Message",
      dataIndex: "message",
    },

    {
      title: "Contact Details",
      dataIndex: "contactDetails",
      render: (text, record) => {
        return (
          <div>
            <p>Phone: {record.mobile}</p>
            <p>Email: {record.buyer.email}</p>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex gap-3 flex-col">
      <Table columns={columns} dataSource={bidsData} />
    </div>
  );
}

export default UserBids;
