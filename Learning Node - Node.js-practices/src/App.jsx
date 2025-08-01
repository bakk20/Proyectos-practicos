import { useState } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import {PrivateRoute, AdminRoute} from './front-end/routes/PrivateRoute.jsx'
import { LoginScreen } from './front-end/pages/LoginScreen.jsx'
import { MainScreen} from './front-end/pages/MainScreen.jsx'
import { Layout } from './front-end/Components/Layout.jsx'
import { RegisterScreen} from './front-end/pages/RegisterScreen.jsx'
import { AdminScreen } from './front-end/adminpages/AdminScreen.jsx'
export const  App = () => {

    return(
            <Routes>
                <Route element={<Layout/>}>
                    <Route path='/login' element={<LoginScreen/>}></Route>
                    <Route path='/index' element={<MainScreen/>}></Route>
                    <Route path='/register' element={<RegisterScreen/>}></Route>

                    <Route
                    path='/admin'
                    element={
                        <PrivateRoute>
                            <AdminRoute>
                                <AdminScreen />
                            </AdminRoute>
                        </PrivateRoute>
                    }/>
                    <Route path='*' element={<Navigate to='/login' replace />} />

            </Route>
        </Routes>
    )

}

