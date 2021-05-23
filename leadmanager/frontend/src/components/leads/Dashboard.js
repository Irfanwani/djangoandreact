import React, {Fragment} from 'react'
import Form from './Form'
import Leads from './Leads'
import Register from '../accounts/register'


export default function Dashboard() {
    return (
        <Fragment>
            <Form />
            <Leads />
        </Fragment>
    )
}
