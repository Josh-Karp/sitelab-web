import React from "react";
import style from "./Lifecycle.module.scss";

export const LifeCycle = () => {
  return (
    <div className={style.container}>
      <div>
        <h2>Our Lifecycle</h2>
        <ul role="list" className={style.timeline}>
          <li>
            <h3>Scope & Briefing</h3>
            <p>
              We are a process-driven design agency. Before getting started, we
              ﬁrst discuss the details of the design project clearly. You can
              brief us with your requirements either via email, chat, or call
              (whatever is convenient for you). Our team will get in touch with
              you and thoroughly discuss every minute detail to make sure that
              we could deliver you exactly what you want. Consequently, the
              estimate and timeline for the project also get discussed at this
              point.
            </p>
          </li>
          <li>
            <h3>Wireframing & Draft</h3>
            <p>
            This is the planning stage. At this point, we will provide you with the wireframing based on your specific requirements. The wireframes will help us to come on the same page with the format, approach, and style of the design.
            </p>
          </li>
          <li>
            <h3>Creation & Designing</h3>
            <p>
              As soon as our team gets accustomed to the specifications and a
              wireframe gets finalized, we will start working on the designing
              aspects. Any additions, suggestions, and late changes get
              interchanged at this stage and our designers and project managers
              ensure that this all goes very smoothly.
            </p>
          </li>

          <li>
            <h3>Delivery</h3>
            <p>
              Here comes the time for the final delivery! As committed to you,
              this is the stage when you will be provided with the first draft
              of the design for your review and feedback. This is a cycle
              process and we handle your change requests. Once all is done, we
              deliver you the final files..
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
