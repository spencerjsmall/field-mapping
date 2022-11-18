import {
  Outlet,
  useLoaderData,
  useLocation,
  useMatches,
  useNavigate,
  Link,
} from "@remix-run/react";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { AdminAvatars } from "~/components/admin-avatars";
import { requireFieldSession } from "~/utils/auth.server";
import { prisma } from "~/utils/db.server";
import { IoArrowBackCircle } from "react-icons/io5";
import sf_seal from "../../public/images/sf_seal.png";
import { BsArrowLeftShort } from "react-icons/bs";

export const loader: LoaderFunction = async ({ request, params }) => {
  const session = await requireFieldSession(request);
  const userId = session.get("userId");
  const userSurveyor = await prisma.surveyor.findUniqueOrThrow({
    where: { id: parseInt(userId) },
    include: { user: true },
  });
  return { userSurveyor };
};

export default function FieldLayout() {
  const { userSurveyor } = useLoaderData();
  const matches = useMatches();

  return (
    <div className="h-screen max-h-screen w-screen flex flex-col">
      <div className="flex flex-row bg-black items-center border-b border-slate-600 sticky top-0 z-50 justify-between text-white text-2xl py-3 px-4">
        {matches[2].id != "routes/__field/home" ? (
          <Link
            to={
              matches[2].id == "routes/__field/layers/$layerId"
                ? "/home"
                : `/layers/${matches[2].params.layerId}`
            }
            className="text-3xl"
          >
            <BsArrowLeftShort />
          </Link>
        ) : (
          <img
            src={sf_seal}
            className="w-8"
            alt="City and County of San Francico"
          />
        )}
        <h2 className="uppercase truncate mx-2">
          {matches[2].id == "routes/__field/layers/$layerId"
            ? matches[2].data.layer.name
            : matches[2].id == "routes/__field/home"
            ? "assignments"
            : matches[2].data.feature.label
            ? matches[2].data.feature.label
            : `Record #${matches[2].data.feature.id}`}
        </h2>
        <form action="/auth/logout" method="post">
          <button type="submit">
            <AdminAvatars admins={[userSurveyor]} />
          </button>
        </form>
      </div>

      <div className="w-full max-h-full h-full overflow-y-auto z-0">
        <Outlet context={userSurveyor} />
      </div>
    </div>
  );
}
