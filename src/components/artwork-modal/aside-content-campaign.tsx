const CampaignAsideContent = ({ ...item }) => {
  return (
    <>
      <div className="campaign_subTitle">
        <h2>Stree</h2>
      </div>
      <div className="artsist_address">
        <p>{item.scriptEng}</p>
      </div>
    </>
  );
};

export default CampaignAsideContent;
