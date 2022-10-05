const CompanyMainImage = ({ url, isPending }) => {
  return (
    <div className="company-main-image" style={{ backgroundImage: `url(${url})`, filter: isPending ? 'blur(5px)' : 'none' }}></div>
  );
}

export default CompanyMainImage;