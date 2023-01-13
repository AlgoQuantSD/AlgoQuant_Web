import axios from "axios";
import React from "react";

const API_URL =
  "https://55vb89e0gb.execute-api.us-east-1.amazonaws.com/Development";

// class GetUser extends React.Component {
//   state = {
//     data: null,
//     error: null,
//   };

//   componentDidMount() {
//     // const token = localStorage.getItem("token");
//     // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     axios
//       .get(`${API_URL}/test-auth`)
//       .then((res) => {
//         const data = res.data;
//         this.setState({ data });
//       })
//       .catch((error) => {
//         if (error.response)
//           this.setState({
//             error: error.response.data.error,
//           });
//         // handle specific error
//         else this.setState({ error: error.message }); // handle network errors
//       });
//   }

// //   render() {
// //     if (this.state.error) {
// //       return <div>Error: {this.state.error}</div>;
// //     }
// //     if (!this.state.data) {
// //       return <div>Loading...</div>;
// //     }

// //     return <ul>{this.state.data}</ul>;
// //   }
// }
const TestApi = () => {
  axios.get(`${API_URL}/test-auth`).then(
    (response) => {
      var result = response.data;
      console.log(result);
    },
    (error) => {
      console.log(error);
    }
  );
};
export default TestApi;
