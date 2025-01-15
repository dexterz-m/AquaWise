import Tracker from "@/components/Tracker";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Divider from "@/components/Divider";
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'

export default function waterTracker() {
  return (
    <div>
      <ClerkProvider>

        <SignedIn>
          <Header/>
          <Divider/>

          <Tracker/>

          <Footer/>
        </SignedIn>

        <SignedOut>

          <RedirectToSignIn />
          
        </SignedOut>

      </ClerkProvider>
    </div>
  );
}