import Link from "next/link";
import { useRouter } from "next/router";
import { isSinglePageActive } from "../../../../utils/daynamicNavigation";
import Image from "next/image";

const MyAccount = () => {
  const profileMenuItems = [
    { id: 1, name: "Profile", ruterPath: "/my-profile" },
    // { id: 2, name: " My Message", ruterPath: "/my-message" },
    // { id: 3, name: " My Favourite", ruterPath: "/my-favourites" },
    { id: 4, name: "Plan", ruterPath: "/my-package" },
    { id: 5, name: "Log out", ruterPath: "/login" },
  ];
  const route = useRouter();
  return (
    <>
      <div className="user_set_header">
        <Image
          width={40}
          height={40}
          className="float-start"
          src="/assets/images/team/Gary-Avatar.png"
          alt="e1.png"
        />
        <p>
          Shubhendra Patel <br />
          <span className="address">abc@xyz.com</span>
        </p>
      </div>
      {/* End user_set_header */}

      <div className="user_setting_content">
        {profileMenuItems.map((item) => (
          <Link
            href={item.ruterPath}
            key={item.id}
            className="dropdown-item"
            style={
              isSinglePageActive(`${item.ruterPath}`, route.pathname)
                ? { color: "#ff5a5f" }
                : undefined
            }
          >
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default MyAccount;
