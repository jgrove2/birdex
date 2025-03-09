import Image from "next/image";
import { headers } from "next/headers";

const getImage = async(name: string, hostname: string) => {
    try {
        const response = await fetch(`${hostname}/api/images/${name}`);
        if(!response.ok) {
            throw new Error("Failed to fetch image");
        }
        const data = await response.json();
        return data.url;
    } catch (error: any) {
        console.error("Error fetching image:", error);
    }
}

export default async function R2Image(props: { width: number, height: number, alt: string, name: string, className: string}) {
    const {width, height, alt, name, className} = props;
    const headersList = await headers();
    const hostname = headersList.get('host') ?? "";
    const http = headersList.get('x-forwarded-proto') ?? "";
    const imageUrl = await getImage(name, `${http}://${hostname}`);

    return (
        <div>
            {imageUrl ? <Image src={imageUrl} alt={alt} width={width} height={height} className={className} /> : <p>Loading...</p>}
        </div>
    )
}