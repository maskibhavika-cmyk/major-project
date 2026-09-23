import { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    skills: "",
    about: "",
  });

  return (
    <div className="min-h-screen bg-[#030712] text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">

        <p className="text-blue-500 font-medium mb-2">
          MY PROFILE
        </p>

        <h1 className="text-4xl font-bold">Profile</h1>

        <p className="text-gray-400 mt-3 mb-8">
          Manage your personal and professional information.
        </p>

        <div className="bg-[#111827] border border-gray-800 rounded-xl p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-gray-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                placeholder="Enter your name"
                className="w-full bg-[#030712] border border-gray-700 rounded-lg px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                placeholder="Enter your email"
                className="w-full bg-[#030712] border border-gray-700 rounded-lg px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">
                Phone
              </label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                placeholder="Enter your phone"
                className="w-full bg-[#030712] border border-gray-700 rounded-lg px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">
                GitHub
              </label>
              <input
  type="text"
  value={profile.github}
  onChange={(e) =>
    setProfile({ ...profile, github: e.target.value })
  }
  placeholder="GitHub profile"
  className="w-full bg-[#030712] border border-gray-700 rounded-lg px-4 py-3 outline-none"
/>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">
                LinkedIn
              </label>
              <input
                type="text"
                value={profile.linkedin}
                onChange={(e) =>
                  setProfile({ ...profile, linkedin: e.target.value })
                }
                placeholder="LinkedIn profile"
                className="w-full bg-[#030712] border border-gray-700 rounded-lg px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">
                Skills
              </label>
              <input
                type="text"
                value={profile.skills}
                onChange={(e) =>
                  setProfile({ ...profile, skills: e.target.value })
                }
                placeholder="React, Node.js, MongoDB"
                className="w-full bg-[#030712] border border-gray-700 rounded-lg px-4 py-3 outline-none"
              />
            </div>

          </div>

          <div className="mt-6">
            <label className="block text-gray-400 mb-2">
              About
            </label>

            <textarea
              rows="4"
              value={profile.about}
              onChange={(e) =>
                setProfile({ ...profile, about: e.target.value })
              }
              placeholder="Tell something about yourself..."
              className="w-full bg-[#030712] border border-gray-700 rounded-lg px-4 py-3 outline-none"
            ></textarea>
          </div>

          <button
            className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
          >
            Save Profile
          </button>

        </div>
      </div>
    </div>
  );
}

export default Profile;