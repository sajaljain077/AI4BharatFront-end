import React, { useState, useEffect} from 'react';
// import { useHistory } from 'react-router-dom';

const First = () => {
  const [placeholderValue, setPlaceholderValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [projectResp, setProjectResp] = useState('');
  const [languageData, setData] = useState([{}]);
//   const history = useHistory();
  const fetchData = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8003/api/v1/languages');
        const resp = await response.json();
        setData(resp.data);
    } catch (error) {
        console.error(error);
    }
    };
    useEffect(() => {
        fetchData();
    }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let payload = {"target_lang_id":dropdownValue, "project_title":placeholderValue}
    const request1 = {headers: {"Content-Type": "application/json"},method : 'POST',  body: JSON.stringify(payload)};
    fetch("http://127.0.0.1:8003/api/v1/project", request1)
    .then((res) => res.json())
    .then((response) => {setProjectResp(response)})
    .catch((err) => {
      console.log(err);
    });
  };
  const placeHolderCSS = {
    color: "black",
    padding: "10px",
    fontFamily: "Arial",
  };
  const dropDownCSS = {
    color: "black",
    padding: "10px",
    fontFamily: "Arial",
  }; 
  return (
    <div>
      <h1>This is a language conversion data set collection project</h1>
    <form onSubmit={handleSubmit}>
      <div style={{ color: 'blue', lineHeight : 5 }}>
        <input
          style={placeHolderCSS}
          type="text"
          placeholder="Enter a topic name"
          value={placeholderValue}
          onChange={(event) => setPlaceholderValue(event.target.value)}
        />
      </div>
      <div>
        <select
          style={dropDownCSS}
          value={dropdownValue}
          onChange={(event) => setDropdownValue(event.target.value)}
        >
          <option value="">Select a language</option>
          {languageData.map(languageData=>(
          <option key={languageData.lang_id}value={languageData.lang_id}>{languageData.language}</option>
          ))
          }
        </select>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    </div>
  );
};
export default First;