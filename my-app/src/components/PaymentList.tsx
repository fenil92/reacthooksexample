import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/paymentActionCreator';
import { PaymentDetail } from '../models/paymentDetail';
import Pagination from "react-js-pagination";


const PaymentList = (props:any) => {
    const payments = useSelector((state: any)=> state.PaymentReducer);
    const dispatch = useDispatch();
    const {fetchPaymentList, deletePaymentDetail, setActivePage} = bindActionCreators(actionCreators,dispatch);

    const handleDelete = async (id: number) =>{
        let totalPages = Math.floor((payments.data.length-1) / 3);
        let currentActivePage = payments.activePage > totalPages ? 1: payments.activePage;
        console.log(currentActivePage, totalPages)
        await deletePaymentDetail(id, currentActivePage);
        
    }

    const listDetails = payments?.activePageData.map((detail:PaymentDetail, index:number) =>{
        return (
        <tr key={index}>
        <th scope="row">{detail.cardOwnerName}</th>
        <td>{detail.cardNumber}</td>
        <td>{detail.securityCode}</td>
        <td>{detail.expirationDate}</td>
        <td>{<button onClick={() => props.handleFormUpdate(detail)} className="btn btn-outline-primary">Update</button>}</td>
        <td>{<button onClick={() => handleDelete(detail.paymentId!)} className="btn btn-outline-danger">Delete</button>}</td>
        </tr>)
    })

    const handlePageChange = (pageNumber: number) => {
        console.log(`active page is ${pageNumber}`);
        setActivePage(pageNumber);
      }
    
    useEffect(() => {
        fetchPaymentList();
    }, [])
    
    return (<div>
        {payments.data.length > 0 && <div><table className="table">
            <thead>
                <tr>
                <th scope="col">Card Owner</th>
                <th scope="col">Card Number</th>
                <th scope="col">Security Code</th>
                <th scope="col">Expiration Date</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {listDetails}    
            </tbody></table>
            <Pagination
                activePage={payments.activePage}
                itemsCountPerPage={3}
                totalItemsCount={payments.data.length}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
            />
         </div>
            }
    </div>)
    
}

export default PaymentList;
