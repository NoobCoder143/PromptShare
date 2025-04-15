"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut, getProviders, signIn, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const [providers, setproviders] = useState(null);
  const [mypost, setmypost] = useState(false);
  useEffect(() => {
    const setUpproviders = async () => {
      const response = await getProviders();
      setproviders(response);
    };

    setUpproviders();
  }, []);
  const [dropdown, setdropdown] = useState(false);
  const { data: session } = useSession();
  return (
    <nav>
      {/* desktop Navigation */}
      <div className="sm:flex hidden ">
        {session?.user ? (
          <>
            <div className="absolute top-0 right-0 p-4 flex gap-3 md:gap-5">
              <Link className="black_btn" href="/create-prompt">
                Create Post
              </Link>

              <button type="button" onClick={signOut} className="outline_btn">
                SignOut
              </button>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt="Profile_image"
              />
            </div>
            <div className="absolute top-0 left-0 p-4 flex gap-3 md:gap-5">
              {!mypost ? (
                <Link
                  className="black_btn"
                  href="/user-prompt"
                  onClick={() => {
                    setmypost(!mypost);
                  }}
                >
                  My Posts
                </Link>
              ) : (
                <Link
                  className="black_btn"
                  href="/"
                  onClick={() => {
                    setmypost(!mypost);
                  }}
                >
                  Home
                </Link>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="absolute top-0 right-0 p-4 flex gap-3 md:gap-5">
              {providers &&
                Object.values(providers).map(
                  (
                    provider //here the provider is refering to providers in the route not provider.jsx
                  ) => (
                    <button
                      type="button"
                      key={provider.id}
                      onClick={() => signIn(provider.id)}
                      className="black_btn"
                    >
                      Sign In
                    </button>
                  )
                )}
            </div>
          </>
        )}
      </div>

      {/* mobile navigation */}
      <div className="sm:hidden relative w-full">
        {session?.user ? (
          <div className=" flex ">
            <img
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              alt="Profile_image"
              onClick={() => setdropdown(!dropdown)}
            />
            {dropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setdropdown(false)}
                >
                  MY Profile
                </Link>
                <Link
                  href="/create_prompt"
                  className="dropdown_link"
                  onClick={() => setdropdown(false)}
                >
                  Create
                </Link>
                <button
                  className="black_btn w-full"
                  onClick={() => {
                    setdropdown(false);
                    signOut();
                  }}
                  type="button"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
