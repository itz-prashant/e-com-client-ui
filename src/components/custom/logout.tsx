"use client";

import { logout } from "@/lib/action/logout";
import { Button } from "../ui/button";

const Logout = () => {
  return (
    <Button
      onClick={ async () => {
       await logout()
      }}
      size={"sm"}
    >
      Logout
    </Button>
  );
};

export default Logout;
