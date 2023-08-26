import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';
import './Footer.css'
export default function Footer() {
  return (
    <div className='body' style={{maxWidth:"100%"}}>
      <br>
      </br>
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#f1f1f1' }}>
      <MDBContainer className='pt-3'>
        <section className='mb-1'>
         

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-linkedin' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center text-dark p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright: <t>  </t><t>  </t>
        <a className='text-dark' href='https://www.eamana.gov.sa/'>
         eamana
        </a>
      </div>
    </MDBFooter>
    </div>
  );
}