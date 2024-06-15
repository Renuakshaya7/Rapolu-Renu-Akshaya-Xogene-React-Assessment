// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DrugDetails = () => {
  const { drugName } = useParams();
  const [drugDetails, setDrugDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrugDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${drugName}`);
        if (response.data.idGroup.rxnormId) {
          const rxcui = response.data.idGroup.rxnormId[0];
          const detailsResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/properties.json`);
          const ndcsResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/ndcs.json`);

          setDrugDetails({
            rxcui: detailsResponse.data.properties.rxcui,
            name: detailsResponse.data.properties.name,
            synonyms: detailsResponse.data.properties.synonym,
            ndcs: ndcsResponse.data.ndcGroup.ndcList.ndc
          });
        } else {
          setError('No details found for this drug.');
        }
      } catch (error) {
        setError('An error occurred while fetching drug details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrugDetails();
  }, [drugName]);

  return (
    <div className="drug-details">
      <header>
        <h1>Drug Details</h1>
      </header>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {drugDetails && (
        <div>
          <h2>{drugDetails.name}</h2>
          <p><strong>RXCUI:</strong> {drugDetails.rxcui}</p>
          <p><strong>Synonyms:</strong> {drugDetails.synonyms ? drugDetails.synonyms.join(', ') : 'None'}</p>
          <h3>Associated NDCs</h3>
          <ul>
            {drugDetails.ndcs.map((ndc, index) => (
              <li key={index}>{ndc}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DrugDetails;
