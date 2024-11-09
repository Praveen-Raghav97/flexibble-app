"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
    id: string;
    image: string;
    title: string;
    name: string;
    avatarUrl: string;
    userId: string;
    channelLink: string;
};


const Card = ({ id, image, title, name, avatarUrl, userId , channelLink }: Props) => {
    const [randomLikes, setRandomLikes] = useState(0);
    const [randomViews, setRandomViews] = useState('');

    useEffect(() => {
        setRandomLikes(Math.floor(Math.random() * 10000))
        setRandomViews(String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + 'k'))
    }, []);

    return (
        <div className="flexCenter flex-col rounded-2xl drop-shadow-card shadow-sm">
            <div className="flexCenter group relative w-full h-full cursor-pointer">
                <Image
                    src={image}
                    width={414}
                  height={4}
                    className="w-full  object-cover rounded-2xl"
                    alt="project image"
                />

                <div className="hidden group-hover:flex profile_card-title">
                    <p className="w-full">{title}</p>
                </div>
            </div>

            <div className="flexBetween w-full px-2  font-semibold text-sm">
                <Link href={`/profile/${userId}`}>
                        <div className="flexCenter gap-2">
                            <Image
                                src={avatarUrl}
                                width={24}
                                height={24}
                                className="rounded-full"
                                alt="profile image"
                            />
                            <p>{name}</p>
                        </div>               
                </Link>

                <div className="flexCenter gap-3">
                    <div className="flexCenter gap-2">
                        <Link href={channelLink} title="Link" className="p-4  text-blue-500 m-3 rounded-xl text-sm font-medium max-md:w-full ">
                        Link
                        </Link>
                       
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Card;