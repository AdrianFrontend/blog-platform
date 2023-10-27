import { useForm } from "react-hook-form"
import s from "./Login.module.css"
import { Link } from "react-router-dom"
import { authAPI } from "../../API/API"
import { useState } from "react"

const Login = () => {
    const [loading, setLoading] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm()

    const onSubmit = (data) => {
        authAPI.login({ email: data.emailAddress, password: data.password })
        setLoading(true)
    }

    const emailRegex = /^[a-zA-Zа-яА-Я0-9._%+-]+@[a-zA-Zа-яА-Я0-9.-]+\.[a-zA-Zа-яА-Я]{2,}$/;

    return (
        <div className={s.Login}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <span className={s.title}>Sign In</span>
                <div className={s.field}>
                    <span className={s.fieldName}>Email address</span>
                    <input
                        type="mail"
                        {...register("emailAddress", { required: true, pattern: { value: emailRegex, message: "Invalid email" } })}
                        placeholder="Email address"
                        className={s.fieldInput}
                    />
                    {errors?.emailAddress && <span className={s.error} style={{ textAlign: "center" }}>{errors?.emailAddress?.message || "Incorrect Email"}</span>}
                </div>
                <div className={s.field}>
                    <span className={s.fieldName}>Password</span>
                    <input
                        type="password"
                        {...register("password", {
                            required: true, minLength: { value: 6, message: "Min length is 6" },
                            maxLength: { value: 40, message: "Min length is 40" },
                        })}
                        placeholder="Password"
                        className={s.fieldInput}
                    />
                    {errors?.password && <span className={s.error} style={{ textAlign: "center" }}>{errors?.password?.message || "Incorrect Password"}</span>}
                </div>

                <button className={s.createButton} type="submit" disabled={loading}>
                    Login
                </button>
                <span className={s.signInOffer}>
                    Don’t have an account? <Link to="/register">Sign Up</Link>.
                </span>
            </form>
        </div>
    )
}

export default Login