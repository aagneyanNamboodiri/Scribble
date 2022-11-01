import React from "react";

import { Modal, Button, Typography } from "neetoui";

const ArticleSearchModal = ({ isSearchModalOpen, setIsSearchModalOpen }) => (
  <div className="w-full">
    <Modal
      isOpen={isSearchModalOpen}
      onClose={() => setIsSearchModalOpen(false)}
    >
      <Modal.Header description="Short description">
        <Typography id="dialog1Title" style="h2">
          They're creepy & they're kooky
        </Typography>
      </Modal.Header>
      <Modal.Body className="space-y-2">
        <Typography lineHeight="normal" style="body2">
          Somewhere out in space live the Herculoids! Zok, the laser-ray dragon!
          Igoo, the giant rock ape! Tundro, the tremendous! Gloop and Gleep, the
          formless, fearless wonders! With Zandor, their leader, and his wife,
          Tara, and son, Dorno, they team up to protect their planet from
          sinister invaders! All-strong! All-brave! All-heroes! They're the
          Herculoids!
        </Typography>
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button label="Continue" onClick={() => setIsSearchModalOpen(false)} />
        <Button
          label="Cancel"
          style="text"
          onClick={() => setIsSearchModalOpen(false)}
        />
      </Modal.Footer>
    </Modal>
  </div>
);

export default ArticleSearchModal;
