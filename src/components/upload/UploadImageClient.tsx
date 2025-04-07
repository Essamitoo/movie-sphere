"use client"

import { useState, useContext } from "react"
import { AuthContext } from "@/contexts/authContext"
import { Pencil } from "lucide-react"
import Image from "next/image"

interface UploadImageClientProps {
  image?: string 
}

export default function UploadImageClient({ image }: UploadImageClientProps) {
  const [imageUrl, setImageUrl] = useState(image )
  const [deleteToken, setDeleteToken] = useState("")
  const { user, setUser } = useContext(AuthContext)

  if(!user) return

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (deleteToken) {
      await fetch(
        "https://api.cloudinary.com/v1_1/" +
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME +
          "/delete_by_token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: deleteToken }),
        }
      )
      console.log("Imagen anterior eliminada")
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    )

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )

    const data = await res.json()
    setImageUrl(data.secure_url)
    setDeleteToken(data.delete_token)

    if (user) {
      const updatedUser = {
        ...user,
        user: {
          ...user.user,
          image: data.secure_url,
        },
      }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return (

<div className="relative mx-auto size-30">
  <div className="relative w-full h-full rounded-full overflow-hidden">
    <Image
      src={imageUrl || user?.user.image}
      alt="user"
      fill
      style={{ objectFit: "cover" }}
    />
  </div>

  

  <label
    htmlFor="file-upload"
    className="absolute -bottom-0 -right-0 bg-white p-2 rounded-full hover:cursor-pointer hover:scale-105 transition duration-200 ease-in-out"
  >
    <Pencil className="w-4 h-4 text-gray-700" />
  </label>

  <input
    id="file-upload"
    type="file"
    onChange={handleFileChange}
    className="hidden"
  />
</div>
  )
}
