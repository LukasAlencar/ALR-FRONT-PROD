import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineCheck } from 'react-icons/ai'
import { HiOutlinePencilSquare, HiXMark } from 'react-icons/hi2'

const InputEdit = ({ valueDefault, onSubmit, typeInput }) => {
    const { register, formState: errors, handleSubmit } = useForm()
    const [isEdit, setIsEdit] = useState(false)

    if (!isEdit) {
        return (
            <>
                {valueDefault ? valueDefault : ''} <HiOutlinePencilSquare style={{ marginTop: -3 }} className='pencil' onClick={() => setIsEdit(true)} />
            </>
        )
    } else {
        return (
            <>
                <div className='d-flex'>
                    <input
                        defaultValue={valueDefault ? valueDefault : ''}
                        style={{width: '80%'}}
                        className='form-control'
                        type={typeInput ? typeInput : 'text'}
                        placeholder={valueDefault ? valueDefault : ''}
                        {...register("input", { required: true })}
                    />
                    {errors?.input?.type === "required" && <span className='error font-tertiary label-cp'>Required *</span>}
                    <div className='d-flex flex-1 justify-content-evenly'>
                        <button onClick={() => handleSubmit(onSubmit)()} style={{ maxWidth: 100 }} className='btn btn-success'><AiOutlineCheck /></button>
                        <button onClick={() => setIsEdit(false)} style={{ maxWidth: 100 }} className='btn btn-danger'><HiXMark /></button>
                    </div>
                </div>
            </>
        )
    }

}

export default InputEdit