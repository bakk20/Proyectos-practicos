import { useState } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import {PrivateRoute, AdminRoute} from './front-end/routes/PrivateRoute.jsx'
import { LoginScreen } from './front-end/pages/LoginScreen.jsx'
import { MainScreen} from './front-end/pages/MainScreen.jsx'
import { Layout } from './front-end/Components/Layout.jsx'

export const  App = () => {

    return(
            <Routes>
                <Route element={<Layout/>}>
                    <Route index element={<MainScreen/>}></Route>
                    <Route path='/login' element={<LoginScreen/>}></Route>

                    <Route
                    path='/admin'
                    element={
                        <PrivateRoute>
                            <AdminRoute>
                                <adminDashBoard />
                            </AdminRoute>
                        </PrivateRoute>
                    }/>
                    <Route path='*' element={<Navigate to='/MainScreen' replace />} />

            </Route>
        </Routes>
    )

}

