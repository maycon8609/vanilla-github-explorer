/**
 * @description Get github User data
 *
 * @param {string} userName Github userName
 **/
async function getUserData(userName) {
   if (userName) {
      const response = await fetch(`https://api.github.com/users/${userName}`);

      const userData = await response.json();

      if (response.status === 404) {
         return parsedData.message;
      }

      return {
         id: userData.id,
         name: userData.name,
         userName: userData.login,
         url: userData.html_url,
         avatarUrl: userData.avatar_url,
         bio: userData.bio,
         blog: userData.blog,
         company: userData.company,
         publicRepos: userData.public_repos,
         location: userData.location,
         email: userData.email,
         followers: userData.followers,
         following: userData.following,
      };
   }

   return {};
}

function generateHeader(userData) {
   const header = document.createElement("header");

   const avatar = document.createElement("img");

   avatar.classList.add("avatar");
   avatar.setAttribute(
      "src",
      `${userData?.avatarUrl ?? ''}`
   );

   // Container to userInfo and userContact
   const userContentContainer = document.createElement("div");
   userContentContainer.classList.add("userContentContainer");

   const userInfo = document.createElement("div");
   userInfo.classList.add("userInfo");

   const name = document.createElement("span");
   name.classList.add("name");
   name.textContent = `${userData?.name ?? ''}`;

   const userName = document.createElement("span");
   userName.classList.add("userName");
   userName.textContent = `${userData?.userName ?? ''}`;

   const location = document.createElement("span");
   location.classList.add("location");
   location.textContent = `${userData?.location ?? ''}`;

   userInfo.appendChild(name);
   userInfo.appendChild(userName);
   userInfo.appendChild(location);

   const userContact = document.createElement("div");
   userContact.classList.add("userContact");

   const blog = document.createElement("a");
   blog.classList.add("blog");
   blog.setAttribute(
      "href",
      `${userData?.blog ?? ''}`
   );
   blog.setAttribute("target", "blank");
   blog.textContent = "Blog";

   const email = document.createElement("a");
   email.classList.add("email");
   email.setAttribute("href", `mailto:${userData?.email ?? ''}`);
   email.setAttribute("target", "blank");
   email.textContent = "E-mail";

   const company = document.createElement("span");
   company.classList.add("company");
   company.textContent = `${userData?.company ?? ''}`;

   userContact.appendChild(blog);
   userContact.appendChild(email);
   userContact.appendChild(company);

   userContentContainer.appendChild(userInfo);
   userContentContainer.appendChild(userContact);

   header.appendChild(avatar);
   header.appendChild(userContentContainer);

   return header;
}

function sectionSpan(displayValue, label) {
   const sectionSpanContainer = document.createElement("div");
   sectionSpanContainer.classList.add("sectionSpanContainer");

   const spanValue = document.createElement("span");
   spanValue.textContent = `${displayValue ?? ""}`;
   spanValue.classList.add("spanValue");

   const spanLabel = document.createElement("span");
   spanLabel.textContent = ` ${label ?? ""}`;
   spanLabel.classList.add("spanLabel");

   sectionSpanContainer.appendChild(spanValue);
   sectionSpanContainer.appendChild(spanLabel);

   return sectionSpanContainer;
}

function generateSection(userData) {
   const section = document.createElement("section");

   const sectionContainer = document.createElement("div");
   sectionContainer.classList.add("sectionContainer");

   const publicRepos = sectionSpan(`${userData?.publicRepos ?? 0}`, "publicRepos");
   const followers = sectionSpan(`${userData?.followers ?? 0}`, "followers");
   const following = sectionSpan(`${userData?.following ?? 0}`, "following");

   sectionContainer.appendChild(publicRepos);
   sectionContainer.appendChild(followers);
   sectionContainer.appendChild(following);

   section.appendChild(sectionContainer);

   return section;
}

function generateFooter(following) {
   const footer = document.createElement("footer");

   const footerSpan = document.createElement('span')
   footerSpan.classList.add('footerSpan')
   footerSpan.textContent = `${following?.bio ?? ''}`

   footer.appendChild(footerSpan)

   return footer;
}

async function app() {
   const userData = await getUserData("maycon8609");
   const root = document.getElementById("root");

   const container = document.createElement("div");
   container.classList.add("container");

   const header = generateHeader(userData);

   const divider = document.createElement("hr");
   divider.classList.add("divider");

   const section = generateSection(userData);

   const footer = generateFooter(userData);

   container.appendChild(header);
   container.appendChild(divider);
   container.appendChild(section);
   container.appendChild(footer);

   root.appendChild(container);
}

app();
