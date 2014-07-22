<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">


<!-- Page template pour les compasantes de formulaire à Alex -->

<xsl:template name="alex-form-checkbox">
	<xsl:param name="name" select="'THE_FIELDS_NAME'"/>
	<xsl:param name="checked" />
	<xsl:param name="extra-class" />
	<xsl:param name="text" select="''" />
	
	<div>
		<xsl:attribute name="class">
			<xsl:text>alex-form-checkbox-ctn</xsl:text>
			<xsl:if test="$checked = 'Yes' or $checked = 'checked'">
				<xsl:text> checked</xsl:text>
			</xsl:if>
			<xsl:if test="string-length($extra-class) != 0">
				<xsl:text> </xsl:text>
				<xsl:value-of select="$extra-class" />
			</xsl:if>
		</xsl:attribute>
	
		<div class="alex-form-checkbox-micro">
			<span class="alex-form-checkbox-check-icon">
				<xsl:call-template name="alex-form-checked-icon" />
			</span>
		</div>
		
		<xsl:if test="string-length($text) != 0">
			<label class="alex-form-checkbox-text">
				<xsl:value-of select="$text" />
			</label>
		</xsl:if>
		
		<input type="checkbox" class="alex-form-checkbox">
		
			<xsl:attribute name="name">
				<xsl:value-of select="$name" />
			</xsl:attribute>
			
			<xsl:if test="$checked = 'Yes' or $checked = 'checked'">
				<xsl:attribute name="checked">
					<xsl:text>checked</xsl:text>
				</xsl:attribute>
			</xsl:if>
		</input>
	</div>
	 
</xsl:template>

<xsl:template name="alex-form-btn">
	<!-- Si le parametre type est a 'submit', c'est un btn pour soumettre
		 Si le parametre type est à 'button', c'est un button type='button'
		 Si le parametre type est à 'a', c'est un <a>  -->

	<xsl:param name="type" select="'submit'" />
	<xsl:param name="text" />
	<xsl:param name="success-text" />
	<xsl:param name="error-text" />
	<xsl:param name="url" />
	<xsl:param name="extra-class" />
	<xsl:param name="disabled" />
	<xsl:param name="error-message" />
	<xsl:param name="success-message" />
	<!-- Le paramètre position doit avoir 'top', 'left', 'right' ou 'bottom
		 Default : 'right' -->
	<xsl:param name="message-position" select="'right'" />
	
	<xsl:variable name="element-name">
		<xsl:choose>
			<xsl:when test="$type = 'a'">
				<xsl:text>a</xsl:text>
			</xsl:when>
			<xsl:otherwise>
				<xsl:text>button</xsl:text>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	
	<div>
		<xsl:attribute name="class">
			<xsl:text>alex-form-btn-ctn</xsl:text>
			
			<xsl:if test="string-length($error-message) != 0 and string-length($success-message) != 0">
				<xsl:text> alex-form-btn-message-</xsl:text>
				
				<xsl:choose>
					<xsl:when test="$message-position = 'top'">
						<xsl:text>top</xsl:text>
					</xsl:when>
					<xsl:when test="$message-position = 'bottom'">
						<xsl:text>bottom</xsl:text>
					</xsl:when>
					<xsl:when test="$message-position = 'left'">
						<xsl:text>left</xsl:text>
					</xsl:when>
					<xsl:otherwise>
						<xsl:text>right</xsl:text>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:if>
			
			<xsl:if test="string-length($extra-class) != 0">
				<xsl:text> </xsl:text>
				<xsl:value-of select="$extra-class" />
			</xsl:if>
			
			<xsl:if test="$disabled = 'Yes' or $disabled = 'disabled'">
				<xsl:text> disabled</xsl:text>
			</xsl:if>
		</xsl:attribute>
		
		<xsl:if test="string-length($success-message) != 0">
			<span class="alex-form-btn-success-msg">
				<xsl:value-of select="$success-message" />
			</span>
		</xsl:if>
		
		<xsl:if test="string-length($error-message) != 0">
			<span class="alex-form-btn-error-msg">
				<xsl:value-of select="$error-message" />
			</span>
		</xsl:if>
	
		<xsl:element name="{$element-name}">
			<xsl:if test="string-length($url) = 0">
				<xsl:attribute name="type">
					<xsl:value-of select="$type" />
				</xsl:attribute>
			</xsl:if>
			
			<xsl:if test="$type = 'a' and $disabled != 'Yes' and $disabled != 'disabled'">
				<xsl:attribute name="href">
					<xsl:value-of select="$url" />
				</xsl:attribute>
			</xsl:if>
			
			<xsl:if test="$disabled = 'Yes' or $disabled = 'disabled'">
				<xsl:attribute name="disabled">
					<xsl:text>disabled</xsl:text>
				</xsl:attribute>
			</xsl:if>
			
			<xsl:attribute name="class">
				<xsl:text>alex-form-btn</xsl:text>
			</xsl:attribute>
			
			<div class="alex-form-btn-border"></div>
			
			<xsl:if test="$type = 'submit'">
				<div class="alex-form-btn-bg-slider"></div>
			</xsl:if>
			
			
			<div class="alex-form-btn-text-ctn">
				<span class="alex-form-btn-text-title">
					<xsl:value-of select="$text" />
				</span>
				
				<xsl:if test="string-length($error-text) != 0">
					<span class="alex-form-btn-text-error">
						<xsl:value-of select="$error-text" />
					</span>
				</xsl:if>
				
				<xsl:if test="$type = 'submit'">
					<span class="alex-form-btn-text-icon-ctn">
						<xsl:call-template name="alex-form-checked-icon" />
					</span>
				</xsl:if>
			</div>
		</xsl:element>
	</div>
	
</xsl:template> 


<xsl:template name="alex-form-field">
	<xsl:param name="element" select="'input'" />
	<xsl:param name="type" select="'text'" />
	<!-- Pour les inputs mettre .small ou .big
	     Pour un textarea, ça ne changera rien  -->
	<xsl:param name="class" />
	<xsl:param name="name" select="'THE_FIELDS_NAME'" />
	<xsl:param name="placeholder" />
	<xsl:param name="extra-class" />
	<xsl:param name="label-text" />
	<xsl:param name="label-id" />
	<xsl:param name="disabled" />
	
	<div>
		<xsl:attribute name="class">
			<xsl:text>alex-form-field </xsl:text>
			<xsl:value-of select="$class" />
			<xsl:text> </xsl:text>
			<xsl:value-of select="$element" />
			
			<xsl:if test="$disabled = 'Yes' or $disabled = 'disabled'">
				<xsl:text> disabled</xsl:text>
			</xsl:if>
			<xsl:if test="string-length($extra-class) != 0">
				<xsl:text> </xsl:text>
				<xsl:value-of select="$extra-class" />
			</xsl:if>
		</xsl:attribute>
	
		<label>
			<xsl:if test="string-length($label-id) != 0">
				<xsl:attribute name="for">
					<xsl:value-of select="$label-id" />
				</xsl:attribute>
			</xsl:if>
			
			<div class="alex-form-field-icons">
				<div class="alex-form-field-icons-checked">
					<xsl:call-template name="alex-form-checked-icon" />
				</div>
				<div class="alex-form-field-icons-x">
					<xsl:call-template name="alex-form-X-icon" />
				</div>
			</div>
			
			<span class="error"></span>
			<span class="normal">
				<xsl:choose>
					<xsl:when test="string-length($label-text) != 0">
						<xsl:value-of select="$label-text" />
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$placeholder" />
					</xsl:otherwise>
				</xsl:choose>
			</span>
		</label>

		<xsl:element name="{$element}">
			<xsl:attribute name="class">
				<xsl:value-of select="$class" />
			</xsl:attribute>
			
			<xsl:attribute name="placeholder">
				<xsl:value-of select="$placeholder" />
			</xsl:attribute>
			
			<xsl:attribute name="type">
				<xsl:value-of select="$type" />
			</xsl:attribute>
			
			<xsl:attribute name="name">
				<xsl:value-of select="$name" />
			</xsl:attribute>
			
			<xsl:if test="string-length($label-id) != 0">
				<xsl:attribute name="id">
					<xsl:value-of select="$label-id" />
				</xsl:attribute>
			</xsl:if>
			
			<xsl:if test="$disabled = 'Yes' or $disabled = 'disabled'">
				<xsl:attribute name="disabled">
					<xsl:text>disabled</xsl:text>
				</xsl:attribute>
			</xsl:if>
		</xsl:element>
	</div>
</xsl:template>

<xsl:template name="alex-form-checked-icon">
	<svg class="alex-form-checked-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 width="21.114px" height="17.601px" viewBox="0 0 21.114 17.601" xml:space="preserve" preserveAspectRatio="xMinYMin meet">
		<polyline fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" points="0.707,11.967 4.927,16.187 20.407,0.707"/>
	</svg>
</xsl:template>

<xsl:template name="alex-form-X-icon">
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		width="12.408px" height="12.583px" viewBox="0 0 12.408 12.583" xml:space="preserve" preserveAspectRatio="xMinYMin meet">
		<polyline class="alex-form-X" fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" points="11.665,0.958 6.185,6.417 0.664,0.979 "/>
		<polyline class="alex-form-X" fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" points="0.706,11.875 6.185,6.417 11.706,11.854"/>
	</svg>
</xsl:template>

</xsl:stylesheet>