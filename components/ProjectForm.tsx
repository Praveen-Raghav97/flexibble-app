"use client"

import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

import FormField from './FormField';
import Button from './Button';
import CustomMenu from './CustomMenu';
import { categoryFilters } from '@/constant';
import { updateProject, CreateProject, fetchToken, fetchUserByEmail } from '@/lib/ActionControler';
import { FormState, ProjectInterface, SessionInterface } from '@/commom.types';

type Props = {
    type: string,
    session: SessionInterface,
    project?: ProjectInterface
}

const ProjectForm = ({ type, session, project }: Props) => {
    const router = useRouter()

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [form, setForm] = useState<FormState>({
        title: project?.title || "",
        description: project?.description || "",
        image: project?.image || "",
        livesiteUrl: project?.livesiteUrl || "",
        githubUrl: project?.githubUrl || "",
        category: project?.category || ""
    })

    const handleStateChange = (fieldName: keyof FormState, value: string) => {
        setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
        console.log(form.image , "img form")
    };

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.includes('image')) {
            alert('Please upload an image!');

            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = reader.result as string;

            handleStateChange("image", result)
            console.log(result , 'img url')
        };
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setSubmitting(true)
    console.log(form)
        const { token } = await fetchToken()

        try {
            if (type === "create") {
                await CreateProject(form, session?.user?.id, token)
                console.log(session.user._id)
                router.push("/")
            }
            
            if (type === "edit") {
                await updateProject(form, project?._id as string, token)

                router.push("/")
            }

        } catch (error) {
            alert(`Failed to ${type === "create" ? "create" : "edit"} a project. Try again!`);
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flexStart form">
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    {!form.image && 'Choose a poster for your project'}
                </label>
                <input
                    id="image"
                    type="file"
                    accept='image/*'
                    required={type === "create" ? true : false}
                    className="form_image-input"
                    onChange={(e) => handleChangeImage(e)}
                />
                {form.image && (
                    <Image
                        src={form?.image}
                        className="sm:p-10 object-contain z-20" alt="image"
                        fill
                    />
                )}
            </div>

            <FormField
                title="Title"
                state={form.title}
                placeholder="Flexibble"
                setState={(value) => handleStateChange('title', value)}
            />

            <FormField
                title='Description'
                state={form.description}
                placeholder="Showcase and discover remarkable developer projects."
                isTextArea
                setState={(value) => handleStateChange('description', value)}
            />

            <FormField
                type="url"
                title="Website URL"
                state={form.livesiteUrl}
                placeholder="https://praveen-raghav.vercel.app"
                setState={(value) => handleStateChange('livesiteUrl', value)}
            />

            <FormField
                type="url"
                title="GitHub URL"
                state={form.githubUrl}
                placeholder="https://github.com/Praveen-Raghav97"
                setState={(value) => handleStateChange('githubUrl', value)}
            />

            <CustomMenu
                title="Category"
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange('category', value)}
            />

            <div className="flexStart w-full">
                <Button
                    title={submitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
                    type="submit"
                    leftIcon={submitting ? "" : "/plus.svg"}
                    submitting={submitting}
                />
            </div>
        </form>
    )
}

export default ProjectForm