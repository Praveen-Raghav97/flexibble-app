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
};


const ProjectCard = ({ id, image, title, name, avatarUrl, userId }: Props) => {
    const [randomLikes, setRandomLikes] = useState(0);
    const [randomViews, setRandomViews] = useState('');

    useEffect(() => {
        setRandomLikes(Math.floor(Math.random() * 10000))
        setRandomViews(String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + 'k'))
    }, []);

    return (
        <div className="flexCenter flex-col rounded-2xl drop-shadow-card ">
            <Link href={`/project/${id}`} className="flexCenter group relative h-full w-full">
                <Image
                    src={image}
                    width={600}
                  height={600}
                    className=" h-[200px] object-center  rounded-lg object-fit "
                    alt="project image"
                   // style={{ maxWidth: '400px', maxHeight: '200px', width: '100%', height: 'auto' }}
                />

                <div className="hidden group-hover:flex profile_card-title">
                    <p className="w-full">{title}</p>
                </div>
            </Link>

            <div className="flexBetween w-full px-2 py-4 mt-3 font-semibold text-sm">
                <Link href={`/profile/${userId}`}>
                        <div className="flexCenter gap-2">
                            <Image
                                src={avatarUrl || '/'}
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
                        <Image src="/hearth.svg" width={13} height={12} alt="heart" />
                        <p className="text-sm">{randomLikes}</p>
                    </div>
                    <div className="flexCenter gap-2">
                        <Image src="/eye.svg" width={12} height={9} alt="eye" />
                        <p className="text-sm">{randomViews}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;