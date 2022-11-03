import React from "react";
const emailRegex =
    /(?:\d{11}|^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8}(\.[a-z]{2,8})?)$)/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export default function useForms() {
    const testRegex = (value, type) => {
        if (type === "email") {
            return emailRegex.test(value)
        }
        if (type === "password") {
            return passwordRegex.test(value)
        }
    }



    return {
        testRegex
    }
}